import produce, { Draft } from 'immer';
import jwtDecode from 'jwt-decode';
import { Reducer } from 'react';

export const USER_KEY = '@auth/user';
export const PERMISSION_KEY = '@auth/permissions';
export const ACCESS_TOKEN_KEY = '@auth/accessToken';

// #region State

export type AuthUserProps =
    | {
          email: string;
      }
    | undefined;

export type AuthState = {
    authDialogOpen: boolean;
    user: AuthUserProps;
    isLoggedIn: boolean;
    email?: string;
    selectedTab: number;
};

export const INITIAL_AUTH_STATE: AuthState = {
    authDialogOpen: false,
    user: undefined,
    isLoggedIn: true,
    email: undefined,
    selectedTab: 0,
};
// #endregion

// #region Sync Actions
type AuthLoadedAction = { type: 'AUTH_LOADED' };
type LoggedInAction = { type: 'LOGGED_IN'; accessToken: string };
type LoggedOutAction = { type: 'LOGGED_OUT' };
type AuthDialogOpenAction = { type: 'AUTH_DIALOG_OPENED'; email?: string; tab?: number };
type AuthDialogClosedAction = { type: 'AUTH_DIALOG_CLOSED' };
type SelectTabAction = { type: 'SELECT_TAB'; tab: number };
type ChangeUserNameAction = { type: 'CHANGE_USER_NAME'; firstName: string; lastName: string };
type SocialLoggedInAction = { type: 'SOCIAL_LOGGED_IN'; accessToken: string };

export type AuthAction =
    | AuthLoadedAction
    | LoggedInAction
    | LoggedOutAction
    | AuthDialogOpenAction
    | AuthDialogClosedAction
    | SelectTabAction
    | ChangeUserNameAction
    | SocialLoggedInAction;

const authLoaded = (draft: Draft<AuthState>) => {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
        draft.user = JSON.parse(user);
        draft.isLoggedIn = true;
    } else {
        draft.isLoggedIn = false;
    }
};

const loggedIn = (draft: Draft<AuthState>, accessToken) => {
    const user = jwtDecode(accessToken);
    const normalizedUser: AuthUserProps = {
        email: user.sub,
    };
    draft.user = normalizedUser;
    draft.isLoggedIn = true;
    localStorage.setItem(USER_KEY, JSON.stringify(normalizedUser));
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
};

const logIn = (draft: Draft<AuthState>, action: LoggedInAction) => {
    loggedIn(draft, action.accessToken);
};

const logOut = (draft: Draft<AuthState>) => {
    draft.user = undefined;
    draft.isLoggedIn = false;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(PERMISSION_KEY);
};

const openModal = (draft: Draft<AuthState>, action: AuthDialogOpenAction) => {
    draft.authDialogOpen = true;
    draft.email = action.email;
    if (action.tab !== undefined) {
        draft.selectedTab = action.tab;
    }
};
const closeModal = (draft: Draft<AuthState>) => {
    draft.authDialogOpen = false;
    draft.email = undefined;
};
const selectTab = (draft: Draft<AuthState>, action: SelectTabAction) => {
    draft.selectedTab = action.tab;
};

export const reducer: Reducer<AuthState, AuthAction> = produce((draft: Draft<AuthState>, action: AuthAction): void => {
    switch (action.type) {
        case 'AUTH_LOADED':
            authLoaded(draft);
            break;
        case 'LOGGED_IN':
            logIn(draft, action);
            break;
        case 'LOGGED_OUT':
            logOut(draft);
            break;
        case 'AUTH_DIALOG_OPENED':
            openModal(draft, action);
            break;
        case 'AUTH_DIALOG_CLOSED':
            closeModal(draft);
            break;
        case 'SELECT_TAB':
            selectTab(draft, action);
            break;
        default:
            break;
    }
});
