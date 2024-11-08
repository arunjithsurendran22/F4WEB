// components/sidebar/RightSidebar.tsx
import React from "react";
import { motion } from "framer-motion";
import CloseButton from "../Buttons/CloseButton";

interface RightSidebarProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string; // Make title optional with a default value
  children: React.ReactNode; // Content of the sidebar
  width?: string;
}

const RightSidebar: React.FC<RightSidebarProps> = ({
  isVisible,
  onClose,
  title = "", // Default title value
  children,
  width = "w-96",
}) => {
  return (
    <motion.div
      initial={{ x: "100%" }} // Sidebar starts off-screen (to the right)
      animate={{ x: isVisible ? 0 : "100%" }} // Animate to on-screen when visible
      exit={{ x: "100%" }} // Animate off-screen when closed
      transition={{
        type: "spring",
        stiffness: 200, // Adjust stiffness for slower motion
        damping: 50, // Adjust damping for smoother motion
        duration: 1, // Increase duration for slower animation
      }}
      className={`fixed top-0 right-0 z-50 ${width} h-full bg-white shadow-lg text-black overflow-y-auto `}
    >
      <div className="flex justify-between items-center p-6 ">
        <CloseButton onClick={onClose} />
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="w-6"></div> {/* Placeholder to keep title centered */}
      </div>
      <div className="p-6">{children}</div>
    </motion.div>
  );
};

export default RightSidebar;
