// Notifications.tsx
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { notificationsApi } from "@/services/notificationService"; 
import { formatDistanceToNow } from "date-fns"; 
import Sorry from "../ui/Sorry/Sorry";
import SpinnerLoader from "../ui/SpinnerLoader/SpinnerLoader";

interface Notification {
  id: string;
  icon: string;
  title: string;
  description: string;
  createdAt: string;
  viewStatus: boolean;
}

interface NotificationsProps {
  onNotificationCountChange: (count: number) => void; 
}

function Notifications({ onNotificationCountChange }: NotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch notifications on component mount
  const fetchNotifications = async () => {
    try {
      const response: any = await notificationsApi.getAllNotifications();
      const data = response?.data?.notifications || [];
      const formattedNotifications = data.map((notification: any) => ({
        id: notification._id,
        icon: notification.icon,
        title: notification.title,
        description: notification.description,
        createdAt: notification.createdAt,
        viewStatus: notification.viewStatus,
      }));

      setNotifications(formattedNotifications);
      setLoading(false);

      // Specify the type for n as Notification
      onNotificationCountChange(
        formattedNotifications.filter((n: Notification) => !n.viewStatus).length
      );
    } catch (err: any) {
      setError(err.message || "Failed to load notifications");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Function to mark a notification as viewed
  const handleViewNotification = async (id: string) => {
    try {
      await notificationsApi.viewNotification(id);
      fetchNotifications();
    } catch (err) {
      console.error("Failed to update view status", err);
    }
  };

  // Function to clear all notifications
  const handleClearNotifications = async () => {
    try {
      await notificationsApi.clearAllNotifications();
      fetchNotifications();
    } catch (err) {
      console.error("Failed to clear notifications", err);
    }
  };

  // Loading state
  if (loading) {
    return <SpinnerLoader/>
  }

  return (
    <div className="p-4">
      <div className="flex justify-end">
        {notifications.length > 0 && (
          <button
            onClick={handleClearNotifications}
            className="text-customBlueLight rounded"
          >
            Clear All
          </button>
        )}
      </div>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-start space-x-4 mb-4 cursor-pointer ${
              notification.viewStatus ? "opacity-50" : ""
            }`}
            onClick={() => handleViewNotification(notification.id)}
          >
            <div className="bg-customBlueLight3 rounded-full w-12 h-12 flex items-center justify-center">
              <Image
                src={notification.icon}
                alt="Notification Icon"
                width={30}
                height={30}
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-base font-bold">{notification.title}</p>
              <p className="text-base">{notification.description}</p>
              <p className="text-customGrayLight text-sm mt-1">
                {formatDistanceToNow(new Date(notification.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center italic">
          <Sorry />
          <p>No notifications available...</p>
        </div>
      )}
    </div>
  );
}

export default Notifications;
