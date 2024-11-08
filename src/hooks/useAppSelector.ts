import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../store'; // Adjust the import path as necessary

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;