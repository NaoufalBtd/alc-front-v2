import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {AppComponent} from '../../../app.component';

@Injectable()
export class MenuService {

    constructor(public app: AppComponent) {
    }
    private menuSource = new Subject<string>();
    menuSource$ = this.menuSource.asObservable();
    private resetSource = new Subject();
    resetSource$ = this.resetSource.asObservable();
    private _showTpBar = true;
    private _itemstopBar: string[];
    private _overlayMenuActive: boolean;

    private _staticMenuDesktopInactive: boolean;

    private _staticMenuMobileActive: boolean;

    private _layoutMenuScroller: HTMLDivElement;

    private _menuClick: boolean;

    private _userMenuClick: boolean;

    private _notificationMenuClick: boolean;

    private _rightMenuClick: boolean;

    private _resetMenu: boolean;

    private _menuHoverActive: boolean;

    private _topbarUserMenuActive: boolean;

    private _topbarNotificationMenuActive: boolean;

    private _rightPanelMenuActive: boolean;

    private _configActive: boolean;

    private _configClick: boolean;

    private _profileClick: boolean;

    private _inlineUserMenuActive = false;


    get itemstopBar(): string[] {
        return this._itemstopBar;
    }

    set itemstopBar(value: string[]) {
        this._itemstopBar = value;
    }

    get overlayMenuActive(): boolean {
        return this._overlayMenuActive;
    }

    set overlayMenuActive(value: boolean) {
        this._overlayMenuActive = value;
    }

    get staticMenuDesktopInactive(): boolean {
        return this._staticMenuDesktopInactive;
    }

    set staticMenuDesktopInactive(value: boolean) {
        this._staticMenuDesktopInactive = value;
    }

    get staticMenuMobileActive(): boolean {
        return this._staticMenuMobileActive;
    }

    set staticMenuMobileActive(value: boolean) {
        this._staticMenuMobileActive = value;
    }

    get layoutMenuScroller(): HTMLDivElement {
        return this._layoutMenuScroller;
    }

    set layoutMenuScroller(value: HTMLDivElement) {
        this._layoutMenuScroller = value;
    }

    get menuClick(): boolean {
        return this._menuClick;
    }

    set menuClick(value: boolean) {
        this._menuClick = value;
    }

    get userMenuClick(): boolean {
        return this._userMenuClick;
    }

    set userMenuClick(value: boolean) {
        this._userMenuClick = value;
    }

    get notificationMenuClick(): boolean {
        return this._notificationMenuClick;
    }

    set notificationMenuClick(value: boolean) {
        this._notificationMenuClick = value;
    }

    get rightMenuClick(): boolean {
        return this._rightMenuClick;
    }

    set rightMenuClick(value: boolean) {
        this._rightMenuClick = value;
    }

    get resetMenu(): boolean {
        return this._resetMenu;
    }

    set resetMenu(value: boolean) {
        this._resetMenu = value;
    }

    get menuHoverActive(): boolean {
        return this._menuHoverActive;
    }

    set menuHoverActive(value: boolean) {
        this._menuHoverActive = value;
    }

    get topbarUserMenuActive(): boolean {
        return this._topbarUserMenuActive;
    }

    set topbarUserMenuActive(value: boolean) {
        this._topbarUserMenuActive = value;
    }

    get topbarNotificationMenuActive(): boolean {
        return this._topbarNotificationMenuActive;
    }

    set topbarNotificationMenuActive(value: boolean) {
        this._topbarNotificationMenuActive = value;
    }

    get rightPanelMenuActive(): boolean {
        return this._rightPanelMenuActive;
    }

    set rightPanelMenuActive(value: boolean) {
        this._rightPanelMenuActive = value;
    }

    get configActive(): boolean {
        return this._configActive;
    }

    set configActive(value: boolean) {
        this._configActive = value;
    }

    get configClick(): boolean {
        return this._configClick;
    }

    set configClick(value: boolean) {
        this._configClick = value;
    }

    get profileClick(): boolean {
        return this._profileClick;
    }

    set profileClick(value: boolean) {
        this._profileClick = value;
    }

    get inlineUserMenuActive(): boolean {
        return this._inlineUserMenuActive;
    }

    set inlineUserMenuActive(value: boolean) {
        this._inlineUserMenuActive = value;
    }

    get showTpBar(): boolean {
        return this._showTpBar;
    }

    set showTpBar(value: boolean) {
        this._showTpBar = value;
    }

    onMenuStateChange(key: string) {
        this.menuSource.next(key);
    }

    reset() {
        this.resetSource.next();
    }

    isHorizontal() {
        return this.app.layoutMode === 'horizontal';
    }

    isSlim() {
        return this.app.layoutMode === 'slim';
    }

    isOverlay() {
        return this.app.layoutMode === 'overlay';
    }

    isStatic() {
        return this.app.layoutMode === 'static';
    }

    isMobile() {
        return window.innerWidth < 1025;
    }

    isDesktop() {
        return window.innerWidth > 896;
    }

    isTablet() {
        const width = window.innerWidth;
        return width <= 1024 && width > 640;
    }
}
