export interface SelectOptions {
    themeParam: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    withCheckbox: boolean;
    
}

export interface PaymentSelectorOptions {
    selected: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  }
  