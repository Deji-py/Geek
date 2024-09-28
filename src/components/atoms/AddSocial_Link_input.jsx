import React, { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Plus, X } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SocialIcon } from "react-social-icons";
import { toast } from "react-toastify";

const socials = [
  {
    name: "Facebook",
    link: "facebook",
    icon: <FaFacebook />,
    pattern:
      /^(https?:\/\/)?(www\.|web\.)?facebook\.com\/(profile\.php\?id=\d+|[A-Za-z0-9_.-]+)\/?$/,
  },
  {
    name: "Instagram",
    link: "instagram",
    icon: <FaInstagram />,
    pattern: /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9_.-]+\/?$/,
  },
  {
    name: "Linkedin",
    link: "linkedin",
    icon: <FaLinkedin />,
    pattern: /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9_.-]+\/?$/,
  },
  {
    name: "Youtube",
    link: "youtube",
    icon: <FaYoutube />,
    pattern:
      /^(https?:\/\/)?(www\.)?youtube\.com\/(user|channel)\/[A-Za-z0-9_.-]+\/?$/,
  },
];

function AddSocialLinkInput({ type, className, field, list, setList }) {
  const [feature, setFeature] = useState("");
  const [currentSocial, setCurrentSocial] = useState(socials[0]);

  const addToList = () => {
    if (feature.trim() !== "" && currentSocial) {
      const isAlreadyAdded = list.some(
        (link) => link.name === currentSocial.name
      );
      if (!isAlreadyAdded) {
        // Validate the URL
        const isValidUrl = currentSocial.pattern.test(feature);
        if (!isValidUrl) {
          toast(`Please enter a valid ${currentSocial.name} URL.`, {
            type: "info",
          });
          return;
        }

        const updatedLink = { name: currentSocial.name, link: feature };
        setList((prevList) => [...prevList, updatedLink]);
        setFeature("");

        // Check if all socials are added to the list
        const allSocialsAdded = socials.every((social) =>
          list.some((link) => link.name === social.name)
        );
        if (allSocialsAdded) {
          setCurrentSocial(null); // No more options available
        } else {
          // Find the next available option in the dropdown
          const nextOption = socials.find(
            (item) =>
              item.name !== currentSocial.name &&
              !list.some((link) => link.name === item.name)
          );
          if (nextOption) {
            setCurrentSocial(nextOption);
          }
        }
      }
    }
  };

  const deleteItem = (item) => {
    setList((prevList) => prevList.filter((link) => link !== item));
    // Reset currentSocial if it's null
    if (!currentSocial) {
      setCurrentSocial(socials[0]);
    }
  };

  return (
    <div className={`mt-4 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="text-sm lg:text-base">Add Social links</label>
      </div>
      <div className="w-full gap-2 flex items-center">
        <div className="flex-1 relative h-10 border border-glassBorder bg-transparent px-1 rounded flex items-center">
          <Input
            onChange={(e) => setFeature(e.target.value)}
            className="flex-1 h-5 border-none focus:bg-transparent"
            {...field}
            value={feature}
            type={type}
            placeholder="Paste social link"
          />

          <Select
            value={currentSocial?.name || ""}
            onValueChange={(val) =>
              setCurrentSocial(
                socials[socials.findIndex((item) => item.name === val)]
              )
            }
          >
            <SelectTrigger className="w-fit right-1 h-8 gap-2 px-2 lg:px-4 glassmorphism border-[0.5px] border-[#272727] hover:bg-glassBorder">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {socials.map((item, index) => {
                const isAlreadyAdded = list.some(
                  (link) => link.name === item.name
                );
                return (
                  <SelectItem
                    key={index}
                    value={item.name}
                    disabled={isAlreadyAdded}
                    hideIndicator
                  >
                    <div className="flex items-center text-start gap-2">
                      {item.icon}
                      {item.name}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <Button
          className="w-fit right-1 h-9 gap-2 px-4 bg-glassBorder border-[0.5px] border-[#272727] glassmorphism"
          onClick={addToList}
        >
          <p className="hidden lg:block">Add Link</p>
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex items-center gap-2 pt-2 flex-wrap">
        {list.map((item, key) => (
          <div
            className="right-1 h-fit gap-2 text-sm font-normal flex items-start  px-2 py-2 rounded-lg !bg-glassBorder hover:bg-[#22262B]"
            key={key}
          >
            <div className="flex flex-col flex-1 items-start gap-2">
              <div className="gap-x-3 flex items-start">
                {socials.find((social) => social.name === item.name)?.icon}
                <p>{item.name}</p>
              </div>
              <p className="text-xs -mt-1 text-gray-400">
                {item.link.length >= 50
                  ? item.link.slice(0, 50) + "..."
                  : item.link}
              </p>
            </div>
            <X
              onClick={() => deleteItem(item)}
              className="w-4 hover:scale-[1.2] transition-all ease-in-out cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddSocialLinkInput;
