import React from 'react';

type ContactMethod = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

type ContactMethodSelectorProps = {
  selected: string;
  onChange: (id: string) => void;
};

export const Radio: React.FC<ContactMethodSelectorProps> = ({ selected, onChange }) => {

    console.log("Selected --> " + selected);
    
  const contactMethods: ContactMethod[] = [
    {
      id: 'email',
      label: 'E-mail',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M22 7.535v9.465a3 3 0 0 1-2.824 2.995l-.176.005h-14a3 3 0 0 1-2.995-2.824l-.005-.176v-9.465l9.445 6.297a1 1 0 0 0 1.01 0l9.445-6.297z" />
          <path d="M19 4c1.08 0 2.027.57 2.555 1.427l-9.555 6.37-9.555-6.37a2.999 2.999 0 0 1 2.354-1.42h14z" />
        </svg>
      ),
    },

    {
      id: 'sms',
      label: 'SMS',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M11 3h10v8h-3l-4 2v-2h-3z" />
          <path d="M15 16v4a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1v-14a1 1 0 0 1 1-1h2" />
          <path d="M10 18v.01" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h2 className="text-lg font-bold mb-4">Select Contact Method</h2>
      <div className="flex flex-col gap-4">
        {contactMethods.map((method) => (
          <label
            key={method.id}
            className={`flex items-center justify-between p-4 rounded-2xl shadow-md cursor-pointer transition-all border ${
              selected === method.id ? 'border-green-900' : 'border-gray-300'
            }`}
          >
            <div className="flex flex-col items-center justify-center gap-2">
              {method.icon}
              <span className="font-medium uppercase">{method.label}</span>
            </div>
            <input
              type="radio"
              name="contactMethod"
              value={method.id}
              checked={selected === method.id}
              onChange={() => onChange(method.id)}
              className="w-5 h-5 accent-green-600"
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default Radio;

