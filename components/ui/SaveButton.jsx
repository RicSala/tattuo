'use client'

import useSave from "@/hooks/useSave";
import { BsBookmarkPlus, BsBookmarkPlusFill } from "react-icons/bs";

const SaveButton = ({
  listingId,
  currentUser,
  listingType,
}) => {

  const { hasSaved, toggleSave } = useSave({
    listingId,
    currentUser,
    listingType,
  })


  return (
    <div
      onClick={toggleSave}
      className="
    relative
    hover:opacity-80
    transition
    cursor-pointer
    "
    >
      <BsBookmarkPlus
        size={28}
        className="
      fill-white
      absolute
      -top-[2px]
      -right-[2px]
      "/>

      <BsBookmarkPlusFill
        size={24}
        className={
          hasSaved ? 'fill-rose-500' : 'fill-neutral-500/70'
        } />

    </div>
  )
};

export default SaveButton