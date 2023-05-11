import React, { useState } from "react";

interface Tab {
  title: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].title);

  // const indexTab = tabs.findIndex((tab) => tab.title === activeTab);
  return (
    <div>
      <div className="border-b border-gray-200 flex flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.title}
            className={`text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none ${
              activeTab === tab.title ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab(tab.title)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="w-full pt-4">
        {tabs.map(
          (tab) =>
            activeTab === tab.title && <div key={tab.title}>{tab.content}</div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
