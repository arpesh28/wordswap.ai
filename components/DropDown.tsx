import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";
import { languageList } from "../lib/constants";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export type LanguageType = {
  code: string;
  name: string;
};

interface DropDownProps {
  lang: LanguageType;
  setLang: (lang: LanguageType) => void;
}

export default function DropDown({ lang, setLang }: DropDownProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLanguages = languageList.filter((langItem) =>
    langItem.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Menu as="div" className="relative block w-full text-left">
      <div>
        <MenuButton className="inline-flex items-center justify-between w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black">
          {lang?.name}
          <ChevronUpIcon
            className="w-5 h-5 ml-2 -mr-1 ui-open:hidden"
            aria-hidden="true"
          />
          <ChevronDownIcon
            className="hidden w-5 h-5 ml-2 -mr-1 ui-open:block"
            aria-hidden="true"
          />
        </MenuButton>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        afterLeave={() => setSearchTerm("")}
      >
        <MenuItems
          className="absolute left-0 z-10 w-full mt-2 overflow-y-auto origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60"
          key={lang.code}
        >
          <div className="p-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            {filteredLanguages.map((langItem) => (
              <MenuItem key={langItem?.code}>
                {({ focus }) => (
                  <button
                    onClick={() => setLang(langItem)}
                    className={classNames(
                      focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      lang?.code === langItem?.code ? "bg-gray-200" : "",
                      "px-4 py-2 text-sm w-full text-left flex items-center space-x-2 justify-between"
                    )}
                  >
                    <span>{langItem?.name}</span>
                    {lang?.code === langItem?.code ? (
                      <CheckIcon className="w-4 h-4 text-bold" />
                    ) : null}
                  </button>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
