"use client";
import ComplaintConfirmationCard from "@/components/ComplaintConfirmationCard/ComplaintConfirmationCard";
import Modal from "@/components/ui/modal/Modal";
import SpinnerLoader from "@/components/ui/SpinnerLoader/SpinnerLoader";
import { ticketApi } from "@/services/ticketService";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface TicketCategory {
  _id: string;
  categoryName: string;
}

function HelpTopics() {
  const router = useRouter();
  const [help, setHelp] = useState<TicketCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  useEffect(() => {
    const fetchHelpTopics = async () => {
      setLoading(true);
      try {
        const response = await ticketApi.getTicketCategories();
        if (response?.data?.ticketCategories) {
          setHelp(response.data.ticketCategories);
        } else {
          setHelp([]);
        }
      } catch (error) {
        console.error("Failed to fetch help topics:", error);
        setHelp([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHelpTopics();
  }, []);

  const handleCreateComplaint = async (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setIsModalOpen(true);
  };

  const confirmComplaintCreation = async () => {
    if (!selectedCategoryId) return;

    try {
      const result = await ticketApi.createTicket(selectedCategoryId);
      if (result) {
        toast.success(result.message);
        router.push("/profile/tickets/ticket-List");
      }
    } catch (error: any) {
      console.error("Error creating ticket:", error);
      toast.error(error.message);
    } finally {
      setIsModalOpen(false);
      setSelectedCategoryId("");
    }
  };

  return (
    <div>
      <h1 className="font-medium mt-8">Help Topics</h1>

      {loading ? (
        <div className="flex justify-center mt-8">
          <SpinnerLoader />
        </div>
      ) : help.length === 0 ? (
        <p className="mt-8">No help topics available.</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-3 md:w-6/12">
          {help.map((topic) => (
            <div
              key={topic._id}
              onClick={() => handleCreateComplaint(topic._id)}
              className="text-xs md:text-sm relative group font-medium py-2 px-4 bg-customBlueLight2 inline-flex rounded-full items-center justify-center text-customBlueLight cursor-pointer"
            >
              {topic.categoryName}

              {/* Tooltip */}
              <span className="tooltip-text">
                Select Topic to create ticket
              </span>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title=""
      >
        <ComplaintConfirmationCard
          onConfirm={confirmComplaintCreation}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      <style jsx>{`
        .tooltip-text {
          visibility: hidden;
          opacity: 0;
          position: absolute;
          bottom: 90%;
          left: 50%;
          transform: translateX(-50%);
          background-color: rgba(0, 0, 0, 0.7);
          color: #fff;
          padding: 5px;
          border-radius: 5px;
          font-size: 12px;
          transition: opacity 0.3s;
        }

        .group:hover .tooltip-text {
          visibility: visible;
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

export default HelpTopics;
