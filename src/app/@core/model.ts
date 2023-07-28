export declare namespace Pbj {

    export interface Progress {
        type: 'start' | 'report' | 'end';
        textID: string;
        count: number;
    }

    export interface ServerSettings {
        autoSignIn: boolean;
        storePassword: boolean;
    }

    export interface ListSettings {
        size: ListItemSize;
        panel: boolean;
    }

    export interface SingleSettings {
        artist: {
            albums: Pbj.ListSettings;
        };
        album: Pbj.ListSettings;
        folder: Pbj.ListSettings;
    }


    export interface AppSettings {
        lastTipsOfTheDay: number[];
        helpIDs: number[];
    }

    export interface ConfigSettings {
        rndSongCount: number;
    }

    export interface QueueSettings {
        list: Pbj.ListSettings;
    }

    export interface PlayerSettings {
        prev: boolean;
        mode: boolean;
        repeat: boolean;
    }

    export interface UiSettings {
        coverAlign: 'top' | 'center';
        coverSize: 'small' | 'medium' | 'large';
        coverFit: 'cover' | 'contain';
        helpMode: 'always' | 'once' | 'never';

        useListSettingsPopoverAlways: boolean;
    }

    export interface Settings {
        server: Pbj.ServerSettings;
        intern: Pbj.AppSettings;
        ui: Pbj.UiSettings;
        single: Pbj.SingleSettings;
        config: Pbj.ConfigSettings;
        player: Pbj.PlayerSettings;
        queue: Pbj.QueueSettings;
    }

    export interface Choice {
        text: string;
        value: any;
        icon?: Pbj.Icon;
    }

    export type Color = 'primary' | 'secondary';
    export type Icon =
        'add-sharp'
        | 'add-circle-sharp'
        | 'albums-sharp'
        | 'apps-sharp'
        | 'barcode-sharp'
        | 'close-sharp'
        | 'close-circle-sharp'
        | 'download-sharp'
        | 'eye-sharp'
        | 'funnel-sharp'
        | 'heart-sharp'
        | 'heart-dislike-sharp'
        | 'heart-empty-sharp'
        | 'heart-half-sharp'
        | 'help-sharp'
        | 'home-sharp'
        | 'pricetags-sharp'
        | 'library-sharp'
        | 'images-sharp'
        | 'keypad-sharp'
        | 'list-sharp'
        | 'ellipsis-horizontal-sharp'
        | 'ellipsis-vertical-sharp'
        | 'pause-sharp'
        | 'play-sharp'
        | 'play-circle-sharp'
        | 'refresh-sharp'
        | 'remove-sharp'
        | 'resize-sharp'
        | 'search-sharp'
        | 'shuffle-sharp'
        | 'toggle-sharp'
        | 'settings-sharp'
        | 'trash-sharp'
        | 'volume-low-sharp'
        | 'volume-mute-sharp'
        | 'volume-off-sharp'
        | 'volume-high-sharp';

    export interface MenuItem {
        route: string[] | string;
        label: string;
        icon: Pbj.Icon;
        disabled?: () => boolean;
    }

    export type ListItemImageMode = 'item' | 'cover' | 'selection' | 'no-images';


    export type ListItemSize = 'small' | 'medium' | 'large';

    export type LifecycleHook =
        'startNav' | 'endNav'
        | 'ionViewWillEnter' | 'ionViewDidEnter'
        | 'ionViewWillLeave' | 'ionViewDidLeave';


}

export interface OnIonViewWillEnter {
    ionViewWillEnter(): void;
}

export interface OnIonViewDidEnter {
    ionViewDidEnter(): void;
}

export interface OnIonViewWillLeave {
    ionViewWillLeave(): void;
}

export interface OnIonViewDidLeave {
    ionViewDidLeave(): void;
}

export interface OnIonViewWillUnload {
    ionViewDidLeave(): void;
}

