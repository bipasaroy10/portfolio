import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    getSettings
} from "../services/settingsApi";


const SettingsContext =
    createContext(null);


// ============================================================
// SETTINGS PROVIDER
// ============================================================

export const SettingsProvider = ({
    children
}) => {

    const [
        settings,
        setSettings
    ] = useState(null);


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        error,
        setError
    ] = useState("");


    // ========================================================
    // LOAD SETTINGS
    // ========================================================

    const loadSettings = async () => {

        try {

            setLoading(true);
            setError("");


            const response =
                await getSettings();


            if (
                response.success &&
                response.data
            ) {

                setSettings(
                    response.data
                );

            } else {

                setError(
                    response.message ||
                    "Failed to load settings"
                );

            }

        } catch (error) {

            console.error(
                "Failed to load settings:",
                error
            );


            setError(
                error.message ||
                "Failed to load settings"
            );

        } finally {

            setLoading(false);

        }

    };


    // ========================================================
    // INITIAL LOAD
    // ========================================================

    useEffect(() => {

        loadSettings();

    }, []);


    // ========================================================
    // REFRESH SETTINGS
    // ========================================================

    const refreshSettings = async () => {

        await loadSettings();

    };


    // ========================================================
    // PROVIDER
    // ========================================================

    return (

        <SettingsContext.Provider
            value={{
                settings,
                setSettings,
                loading,
                error,
                refreshSettings
            }}
        >

            {children}

        </SettingsContext.Provider>

    );

};


// ============================================================
// USE SETTINGS HOOK
// ============================================================

export const useSettings = () => {

    const context =
        useContext(
            SettingsContext
        );


    if (!context) {

        throw new Error(
            "useSettings must be used inside SettingsProvider"
        );

    }


    return context;

};