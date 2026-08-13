import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import { getSettings } from "../services/settingsApi";

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadSettings = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getSettings();

            setSettings(data);

        } catch (error) {
            console.error(
                "Failed to load settings:",
                error
            );

            setError(error.message);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSettings();
    }, []);

    return (
        <SettingsContext.Provider
            value={{
                settings,
                loading,
                error,
                refreshSettings: loadSettings
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(
        SettingsContext
    );

    if (!context) {
        throw new Error(
            "useSettings must be used inside SettingsProvider"
        );
    }

    return context;
};