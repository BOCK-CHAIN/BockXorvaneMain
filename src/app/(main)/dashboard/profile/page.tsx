"use client"

import { useState } from "react"
import { useCurrentUser } from "@/hooks/use-auth-user"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { updateUserAttributes, updatePassword, type UpdatePasswordInput } from "aws-amplify/auth"
import { toast } from "sonner"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { resetPasswordSchema } from "@/schemas/auth.schema"
import { passwordRequirements } from "@/constants/forms"
import { Camera, Check, X } from "lucide-react"
import { handleAuthError } from "@/hooks/errors"
import { useRouter } from "next/navigation"
import { removeProfileImage, updateName, updateUserProfileImage, uploadToS3 } from "@/actions/user"
import { useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address")
});

export default function ProfilePage() {
  const { user } = useCurrentUser()
  const [isFocused, setIsFocused] = useState(false)
  const [profileImage, setProfileImage] = useState(`${user?.profileImage}?${Date.now()}` || "/placeholder-svg.png");
  const [isBlurred, setIsBlurred] = useState(false)
  const [isUploading, setIsUploading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const queryclient = useQueryClient()
  const router = useRouter()

  if (!user) {
    return null;
  }

  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user.name, email: user.email || "" },
  });

  const passwordForm = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { oldPassword: "", newPassword: "", confirmPassword: "" },
  });

  const handleUpdateProfile = async (values: { name: string }) => {
    try {
      await updateUserAttributes({
        userAttributes: {
          name: values.name
        }
      });
      await updateName(values.name, user.email);
      await queryclient.invalidateQueries({
        queryKey: ["User"],
      })
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      handleAuthError(error as Error, router);
    }
  };

  const handleResetPassword = async (values: UpdatePasswordInput) => {
    try {
      await updatePassword({ oldPassword: values.oldPassword, newPassword: values.newPassword });
      toast.success("Password updated successfully");
      passwordForm.reset();
    } catch (error) {
      console.error("Error resetting password:", error);
      if ((error as Error).name === "NotAuthorizedException") {
        return toast.error("Incorrect password. Please try again.");
      }
      handleAuthError(error as Error, router);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null | undefined = event.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const s3Url = await uploadToS3(file.type, user.id);
      if (!s3Url) {
        toast.error("Failed to upload profile picture. Please try again.");
        return;
      }
      await axios.put(s3Url, file, {
        headers: {
          "Content-Type": file.type,
        },
      });
      const url = new URL(s3Url);
      const imageUrl = url.origin + url.pathname;
      if (!user.profileImage) {
        await updateUserProfileImage(user.email, imageUrl)
      }
      setProfileImage(`${imageUrl}?${Date.now()}`);
      await queryclient.invalidateQueries({
        queryKey: ["User"],
      })
      toast.success("Profile picture updated successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload profile picture. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemovePhoto = async () => {
    if (isUploading) return;
    if (!profileImage) {
      toast.info("No profile image to remove");
    }
    try {
      setIsUploading(true);
      const response = await removeProfileImage(user.id);

      if (response.error) {
        console.error(response.error);
        toast.error("Error removing profile image");
      } else {
        setProfileImage("/placeholder-svg.png");
        await queryclient.invalidateQueries({
          queryKey: ["User"],
        })
        toast.success("Profile image removed successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error removing profile image");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...profileForm}>
              <div className="flex flex-col items-center">
                <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-gray-200">
                  <Avatar className="w-full h-full" key={user.profileImage}>
                    <AvatarImage src={`${profileImage}`} alt="Profile Image" />
                    <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {user.profileImage ?
                    <Dialog onOpenChange={(open) => setDialogOpen(open)} open={dialogOpen}>
                      <DialogTrigger asChild>
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity cursor-pointer rounded-full">
                          <Camera className="text-white w-8 h-8" />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-md p-6 rounded-2xl shadow-lg" >
                        <DialogHeader>
                          <DialogTitle className="text-lg font-semibold text-gray-100">Update Profile Picture</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col space-y-6">
                          <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-all text-gray-200">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e)=>{
                                handleImageUpload(e);
                                setDialogOpen(false);
                              }}
                              disabled={isUploading}
                            />
                            <span className="text-sm">Choose a new picture</span>
                          </label>
                          {user.profileImage && (
                            <div className="flex flex-col items-center space-y-4">
                              <Button
                                type="button"
                                onClick={()=>{handleRemovePhoto(); setDialogOpen(false)}}
                                disabled={isUploading}
                                variant="destructive"
                                className="bg-red-500 hover:bg-red-600 text-white"
                              >
                                Remove current picture
                              </Button>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog> :
                    <>
                      <label
                        htmlFor="profileImageInput"
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <Camera className="text-white w-8 h-8" />
                        <input
                          id="profileImageInput"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                          disabled={isUploading}
                        />
                      </label>
                    </>
                  }
                </div>
              </div>
              <form
                className="space-y-4"
                onSubmit={profileForm.handleSubmit(handleUpdateProfile)}
              >
                <FormField
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Update Profile
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...passwordForm}>
              <form
                onSubmit={passwordForm.handleSubmit(handleResetPassword)}
                className="space-y-4"
              >
                <FormField
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Old Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          onFocus={() => setIsFocused(true)}
                          onBlur={() => {
                            setIsFocused(false);
                            setIsBlurred(true);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                      {isFocused && (
                        <ul className="mt-2 space-y-1 transition-opacity duration-200">
                          {passwordRequirements.map((requirement) => {
                            const isMet = requirement.test(passwordForm.watch("newPassword") || "");
                            return (
                              <li
                                key={requirement.id}
                                className={`flex items-center text-sm ${isMet ? "text-green-400" : isBlurred ? "text-red-500" : "text-gray-400"
                                  }`}
                              >
                                {isMet ? (
                                  <Check className="w-4 h-4 mr-2 flex-shrink-0" />
                                ) : (
                                  <X className="w-4 h-4 mr-2 flex-shrink-0" />
                                )}
                                <span>{requirement.label}</span>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Reset Password
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );

}

