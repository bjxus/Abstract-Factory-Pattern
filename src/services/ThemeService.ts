import { DarkUIFactory } from "../domain/factory/DarkUIFactory";
import { LightUIFactory } from "../domain/factory/LightFactory";
import { UIFactory } from "../domain/factory/UIFactory";
import { Theme } from "../domain/model/Theme";

export class ThemeService {
    private lightUIFactory: LightUIFactory;
    private darkUIFactory: DarkUIFactory;

    constructor(
        lightUIFactory = new LightUIFactory(),
        darkUIFactory = new DarkUIFactory()
    ) {
        this.lightUIFactory = lightUIFactory;
        this.darkUIFactory = darkUIFactory;
    }

    getFactory(theme: Theme): UIFactory {
        
            return theme === Theme.DARK ? this.darkUIFactory : this.lightUIFactory;
          
    }
}