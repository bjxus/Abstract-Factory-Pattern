import { Button } from "../ui/Button/Button"
import { Select } from "../ui/Select/Select"
import { TextField } from "../ui/TextField/TextField"
import { Toast } from "../ui/Toast/Toast"

export interface UIFactory {
    createButton(): Button
    createTextField(): TextField
    createSelect(): Select
    createToast(): Toast
}