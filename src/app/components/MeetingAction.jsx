"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LinkIcon, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import Loader from "./Loader";

const MeetingAction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const router = useRouter();

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  // ✅ Always start an instant meeting
  const handleStartMeeting = () => {
    setIsLoading(true);
    const roomId = uuidv4();
    const meetingUrl = `${baseUrl}/video-meeting/${roomId}`;
    router.push(meetingUrl);
    toast.info("Joining meeting...");
  };

  const handleJoinMeeting = () => {
    if (meetingLink) {
      setIsLoading(true);
      const formattedLink = meetingLink.includes("http")
        ? meetingLink
        : `${baseUrl}/video-meeting/${meetingLink}`;
      router.push(formattedLink);
      toast.info("Joining meeting...");
    } else {
      toast.error("Please enter a valid link or code");
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        {/* ✅ Direct button to start a new instant meeting */}
        <Button
          className="w-full sm:w-auto"
          size="lg"
          onClick={handleStartMeeting}
        >
          <Video className="w-5 h-5 mr-2" />
          Start a new meeting
        </Button>

        {/* Join meeting by link or code */}
        <div className="flex w-full sm:w-auto relative">
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
            <LinkIcon className="w-4 h-4 text-gray-400" />
          </span>
          <Input
            placeholder="Enter a code or link"
            className="pl-8 rounded-r-none pr-10"
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
          />
          <Button
            variant="secondary"
            className="rounded-l-none"
            onClick={handleJoinMeeting}
          >
            Join
          </Button>
        </div>
      </div>
    </>
  );
};

export default MeetingAction;
