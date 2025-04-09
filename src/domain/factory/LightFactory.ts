import { Button } from "../ui/Button/Button";
import { LightButton } from "../ui/Button/LightButton";
import { LightSelect } from "../ui/Select/LightSelect";
import { LightTextField } from "../ui/TextField/LightTextField";
import { TextField } from "../ui/TextField/TextField";
import { LightToast } from "../ui/Toast/LightToast";
import { UIFactory } from "./UIFactory";

export class LightUIFactory implements UIFactory{
    
    private lightButton!: LightButton

    private lightTextField!: LightTextField

    private lightSelect!: LightSelect

    private lightToast!: LightToast

    constructor() {
        this.lightButton = new LightButton();
        this.lightTextField = new LightTextField();
        this.lightSelect = new LightSelect();
        this.lightToast = new LightToast();
    }
    createButton(): Button {
        return this.lightButton
    }
    createTextField(): TextField {
        return this.lightTextField
    }

    createSelect(): LightSelect {
        return this.lightSelect
    }

    createToast(): LightToast {
        return this.lightToast
    }


}