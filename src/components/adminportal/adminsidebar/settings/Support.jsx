import React, { useState } from 'react';
import { Switch } from '@headlessui/react';
import { FaCheckSquare, FaRegSquare, FaPen } from 'react-icons/fa';

const Support = () => {
  const [thirdPartySupport, setThirdPartySupport] = useState(false);
  const [thirdPartyChat, setThirdPartyChat] = useState(true);
  const [contentModeration, setContentModeration] = useState(true);
  const [enableIntegrations, setEnableIntegrations] = useState(true);
  const [supportProvider, setSupportProvider] = useState('Intercom');
  const [apiKey, setApiKey] = useState('123 vkhynJfkjfhJhguyay...');
  const [offensiveWords, setOffensiveWords] = useState('Pussy, Satan, Kill her');

  const features = ['Youtube shop', 'Tiktok shop', 'Instagram store', 'Facebook'];
  const featureMatrix = [
    [true, false, true, true],
    [true, false, true, true],
    [true, true, true, true],
    [true, true, true, true],
  ];

  return (
    <div className="lg:p-6 space-y-8">
      <div className='lg:w-1/2'>
        <h2 className="text-lg font-semibold">Support & Moderation —</h2>
        <p className="text-sm text-gray-500 mb-4">Help us know you better.</p>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Third-party support tools.</span>
            <Switch
              checked={thirdPartySupport}
              onChange={setThirdPartySupport}
              className={`${
                thirdPartySupport ? 'bg-blue-600' : 'bg-gray-300'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${
                  thirdPartySupport ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform bg-white rounded-full transition`}
              />
            </Switch>
          </div>

          <div className="flex items-center justify-between">
            <span>Enable/disable third-party live chat.</span>
            <Switch
              checked={thirdPartyChat}
              onChange={setThirdPartyChat}
              className={`${
                thirdPartyChat ? 'bg-blue-600' : 'bg-gray-300'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${
                  thirdPartyChat ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform bg-white rounded-full transition`}
              />
            </Switch>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <label className="text-sm font-medium">Choose default support provider.</label>
            <div className="flex gap-2">
              <select className="border px-4 py-2 rounded-md">
                <option>Intercom</option>
                <option>Zendesk</option>
              </select>
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="border px-4 py-2 rounded-md w-full"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span>
              Enable automated content moderation
              <div className="text-pink-600 text-xs">Flag offensive and ban words</div>
            </span>
            <Switch
              checked={contentModeration}
              onChange={setContentModeration}
              className={`${
                contentModeration ? 'bg-blue-600' : 'bg-gray-300'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${
                  contentModeration ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform bg-white rounded-full transition`}
              />
            </Switch>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium">Offensive words collection</label>
            <div className="relative">
              <textarea
                value={offensiveWords}
                onChange={(e) => setOffensiveWords(e.target.value)}
                className="w-full border rounded-md p-2 pr-10"
              />
              <FaPen className="absolute top-2.5 right-3 text-gray-400" />
            </div>
            <p className="text-xs text-gray-500">Add words with a comma ","</p>
          </div>
        </div>
      </div>

      <div >
        <h2 className="text-lg font-semibold">Plan Features</h2>
        <p className="text-sm text-gray-500 mb-4">Help us know you better.</p>

        <div className="flex items-center justify-between mb-4 lg:w-1/2">
          <span>Enable/disable integrations</span>
          <Switch
            checked={enableIntegrations}
            onChange={setEnableIntegrations}
            className={`${
              enableIntegrations ? 'bg-blue-600' : 'bg-gray-300'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span
              className={`${
                enableIntegrations ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform bg-white rounded-full transition`}
            />
          </Switch>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[600px] table-auto border rounded-md">
            <thead className="rounded-md">
              <tr>
                <th className="px-4 py-2 text-left">Feature</th>
                <th className="px-4 py-2 text-left">Tier 1</th>
                <th className="px-4 py-2 text-left">Tier 2</th>
                <th className="px-4 py-2 text-left">Tier 3</th>
                <th className="px-4 py-2 text-left">Tier 4</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, i) => (
                <tr key={i} className="">
                  <td className="px-4 py-2">{feature}</td>
                  {featureMatrix[i].map((enabled, j) => (
                    <td key={j} className="px-4 py-2">
                      {enabled ? (
                        <FaCheckSquare className="text-blue-600" />
                      ) : (
                        <FaRegSquare className="text-pink-600" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Support;
