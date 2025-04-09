import { Button } from "../ui/Button/Button";
import { DarkButton } from "../ui/Button/DarkButton";
import { DarkSelect } from "../ui/Select/DarkSelect";
import { Select } from "../ui/Select/Select";
import { DarkTextField } from "../ui/TextField/DarkTextField";

import { TextField } from "../ui/TextField/TextField";
import { DarkToast } from "../ui/Toast/DarkToast";
import { Toast } from "../ui/Toast/Toast";
import { UIFactory } from "./UIFactory";

export class DarkUIFactory implements UIFactory{
    
    private darkButton!: DarkButton

    private darkTextField!: DarkTextField

    private darkSelect!: DarkSelect

    private darkToast!: DarkToast

    constructor() {
        this.darkButton = new DarkButton();
        this.darkTextField = new DarkTextField();
        this.darkSelect = new DarkSelect();
        this.darkToast = new DarkToast()
    }
    createButton(): Button {
        return this.darkButton
    }
    createTextField(): TextField {
        return this.darkTextField
    }

    createSelect(): Select {
        return this.darkSelect
    }

    createToast(): Toast {
        return this.darkToast
    }

    
}