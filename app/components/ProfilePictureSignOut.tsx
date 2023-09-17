import Image from "next/image";
import React, { useRef, useState } from "react";
import { MdExitToApp } from "react-icons/md";
import { signOut } from "next-auth/react";
import { IconContext } from "react-icons";
import OutsideClickHandler from "react-outside-click-handler";

export default function ProfilePictureSignOut({
  signOutProfileImageSrc,
  rightSide,
}: {
  signOutProfileImageSrc: string;
  rightSide: boolean;
}) {
  const [popupOpen, setPopupOpen] = useState(false);
  const lastOutsideClickRef = useRef(new Date(0));

  return (
    <>
      {popupOpen && (
        <div className={`absolute top-16 ${rightSide ? "right-5" : "left-5"}`}>
          <OutsideClickHandler
            onOutsideClick={() => {
              setPopupOpen(false);
              lastOutsideClickRef.current = new Date();
            }}
          >
            <div
              className="flex items-center justify-start rounded-lg bg-white px-1 py-2.5 hover:bg-gray-300"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <IconContext.Provider value={{ color: "black" }}>
                <MdExitToApp className="mx-1"></MdExitToApp>
              </IconContext.Provider>
              <p className="mx-1 whitespace-nowrap font-semibold text-black">
                Sign Out
              </p>
            </div>
          </OutsideClickHandler>
        </div>
      )}
      <Image
        className="rounded-full outline-4 outline-yellow-300 transition-all hover:outline"
        onClick={() => {
          const timeSinceLastOutsideClick =
            Date.now() - lastOutsideClickRef.current.getTime();
          if (timeSinceLastOutsideClick >= 20) setPopupOpen(true);
        }}
        alt="Profile picture"
        src={signOutProfileImageSrc}
        width={44}
        height={44}
      />
    </>
  );
}
