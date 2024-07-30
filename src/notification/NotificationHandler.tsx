import React, { useEffect, useState } from 'react';
import { Snackbar, SnackbarContent } from "@mui/material";
import useVisibilityChange from "./useVisibilityChange";
import { handleForegroundMessage } from "../firebase";
import { NotificationPayload } from "@firebase/messaging";

const NotificationHandler = () => {
    const [notification, setNotification] = useState<NotificationPayload>();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const isForeground = useVisibilityChange();

    useEffect(() => {
        if (isForeground) {
            handleForegroundMessage().then((payload: any) => {
                const newNotification = { title: payload.notification?.title, body: payload.notification?.body };
                setNotification(newNotification);
                setSnackbarOpen(true); // Open Snackbar
            });
        }
    }, [isForeground]);

    const handleClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Snackbar
            open={snackbarOpen}
            onClose={handleClose}
            autoHideDuration={5000}
        >
            <SnackbarContent
                message={
                    <div>
                        <strong>{notification?.title}</strong>
                        <p>{notification?.body}</p>
                    </div>
                }
            />
        </Snackbar>
    );
};

export default NotificationHandler;