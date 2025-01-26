'use client'
import React, { useState } from "react";

type InitialValuesProps = {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
};

const InitalValue: InitialValuesProps = {
    loading: false,
    setLoading: () => undefined,
};

const loadingCOntext = React.createContext(InitalValue);

const { Provider } = loadingCOntext;

export const LoaingContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [loading, setLoading] = useState<boolean>(
        InitalValue.loading
    );

    const values = {
        loading,
        setLoading,
    };

    return <Provider value={values}>{children}</Provider>;
};


export const useAuthContextHook = () => {
    const state = React.useContext(loadingCOntext);
    return state;
}