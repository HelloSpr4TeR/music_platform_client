import { RootState } from "../store/slices";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";


export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;