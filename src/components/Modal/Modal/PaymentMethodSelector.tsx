import React from 'react';

type PaymentMethod = {
  id: string;
  label: string;
  img: string;
};

type PaymentMethodSelectorProps = {
  selected: string;
  onChange: (id: string) => void;
};

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ selected, onChange }) => {
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'CREDIT_CARD',
      label: 'Tarjeta crédito',
      img: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png',
    },
    {
      id: 'PAYPAL',
      label: 'PayPal',
      img: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg',
    },
    {
      id: 'DEBIT_CARD',
      label: 'Tarjeta Débito',
      img: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png',
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h2 className="text-lg font-bold mb-4">Payment Method</h2>
      <div className="flex flex-col gap-4">
        {paymentMethods.map((method) => (
          <label
            key={method.id}
            className={`flex items-center justify-between p-4 rounded-2xl shadow-md cursor-pointer transition-all border ${
              selected === method.id ? 'border-green-950' : 'border-transparent'
            }`}
          >
            <div className="flex items-center gap-4">
              <img src={method.img} alt={method.label} className="w-10 h-10 object-contain" />
              <span className="font-medium">{method.label}</span>
            </div>
            <input
              type="radio"
              name="payment"
              value={method.id}
              checked={selected === method.id}
              onChange={() => onChange(method.id)}
              className="w-5 h-5 accent-blue-500"
            />
          </label>
        ))}
      </div>
    </div>
  );
};


