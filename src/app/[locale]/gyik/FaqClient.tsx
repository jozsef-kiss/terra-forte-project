"use client"; // FONTOS: Ez teszi lehetővé az interaktivitást

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

type Props = {
  categories: string[];
  t_categories: any; // A lefordított kategória nevek
  t_items: any; // A kérdések és válaszok
};

export default function FaqClient({
  categories,
  t_categories,
  t_items,
}: Props) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
      <TabGroup>
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Bal oldal: Kategória választó */}
          <div className="lg:col-span-3 mb-8 lg:mb-0">
            <h3 className="sr-only">Kategóriák</h3>
            <TabList className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 no-scrollbar">
              {categories.map((catKey) => (
                <Tab
                  key={catKey}
                  className={({ selected }) =>
                    `w-full text-left rounded-lg px-4 py-3 text-sm font-medium focus:outline-none whitespace-nowrap lg:whitespace-normal transition-all duration-200 ${
                      selected
                        ? "bg-indigo-600 text-white shadow-md"
                        : "bg-white text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                    }`
                  }
                >
                  {t_categories[catKey]}
                </Tab>
              ))}
            </TabList>
          </div>

          {/* Jobb oldal: Kérdések */}
          <div className="lg:col-span-9">
            <TabPanels>
              {categories.map((catKey) => (
                <TabPanel
                  key={catKey}
                  className="focus:outline-none animate-fade-in"
                >
                  <dl className="space-y-4">
                    {t_items[catKey].map((faq: any) => (
                      <Disclosure
                        as="div"
                        key={faq.question}
                        className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5"
                      >
                        {({ open }) => (
                          <>
                            <dt>
                              <DisclosureButton className="flex w-full items-start justify-between px-6 py-5 text-left text-gray-900 hover:!transform-none hover:!shadow-none focus:outline-none">
                                <span className="text-base font-semibold leading-7">
                                  {faq.question}
                                </span>
                                <span className="ml-6 flex h-7 items-center">
                                  <ChevronDownIcon
                                    className={`h-6 w-6 transform text-indigo-600 transition-transform duration-200 ${
                                      open ? "rotate-180" : ""
                                    }`}
                                    aria-hidden="true"
                                  />
                                </span>
                              </DisclosureButton>
                            </dt>
                            <DisclosurePanel
                              transition
                              className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out data-[closed]:grid-rows-[0fr]"
                            >
                              <div className="overflow-hidden">
                                <p className="px-6 pb-6 text-base leading-7 text-gray-600">
                                  {faq.answer}
                                </p>
                              </div>
                            </DisclosurePanel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </dl>
                </TabPanel>
              ))}
            </TabPanels>
          </div>
        </div>
      </TabGroup>
    </div>
  );
}
