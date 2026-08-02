import { create } from "zustand";
import type { AppId, AppNotification, Position, Size, WindowInstance } from "@/types/window";
import { appMeta, appOrder } from "@/data/apps-registry";
import { WINDOW_BASE_POSITION, WINDOW_CASCADE_LIMIT, WINDOW_CASCADE_OFFSET } from "@/lib/constants";

interface OSState {
  windows: Record<string, WindowInstance>;
  focusedWindowId: AppId | null;
  nextZIndex: number;
  openOrder: AppId[];
  notifications: AppNotification[];

  openApp: (appId: AppId) => void;
  closeWindow: (appId: AppId) => void;
  minimizeWindow: (appId: AppId) => void;
  toggleMinimize: (appId: AppId) => void;
  toggleMaximize: (appId: AppId) => void;
  focusWindow: (appId: AppId) => void;
  commitWindowPosition: (appId: AppId, position: Position) => void;
  commitWindowSize: (appId: AppId, size: Size) => void;
  notify: (notification: Omit<AppNotification, "id">) => void;
  dismissNotification: (id: string) => void;
}

let notificationSeq = 0;

export const useOSStore = create<OSState>((set, get) => ({
  windows: {},
  focusedWindowId: null,
  nextZIndex: 1,
  openOrder: [],
  notifications: [],

  openApp: (appId) => {
    const existing = get().windows[appId];

    if (existing) {
      set((state) => ({
        windows: { ...state.windows, [appId]: { ...existing, isMinimized: false } },
      }));
      get().focusWindow(appId);
      return;
    }

    const def = appMeta[appId];
    const cascadeIndex = get().openOrder.length % WINDOW_CASCADE_LIMIT;
    const offset = cascadeIndex * WINDOW_CASCADE_OFFSET;

    set((state) => {
      const zIndex = state.nextZIndex;
      const instance: WindowInstance = {
        appId,
        position: { x: WINDOW_BASE_POSITION.x + offset, y: WINDOW_BASE_POSITION.y + offset },
        size: def.defaultSize,
        zIndex,
        isMinimized: false,
        isMaximized: false,
      };
      return {
        windows: { ...state.windows, [appId]: instance },
        openOrder: [...state.openOrder, appId],
        nextZIndex: zIndex + 1,
        focusedWindowId: appId,
      };
    });
  },

  closeWindow: (appId) => {
    set((state) => {
      const rest = { ...state.windows };
      delete rest[appId];
      return {
        windows: rest,
        openOrder: state.openOrder.filter((id) => id !== appId),
        focusedWindowId: state.focusedWindowId === appId ? null : state.focusedWindowId,
      };
    });
  },

  minimizeWindow: (appId) => {
    set((state) => {
      const win = state.windows[appId];
      if (!win) return state;
      return {
        windows: { ...state.windows, [appId]: { ...win, isMinimized: true } },
        focusedWindowId: state.focusedWindowId === appId ? null : state.focusedWindowId,
      };
    });
  },

  toggleMinimize: (appId) => {
    const { windows, focusedWindowId } = get();
    const win = windows[appId];
    if (!win) return;

    if (win.isMinimized) {
      set((state) => ({ windows: { ...state.windows, [appId]: { ...win, isMinimized: false } } }));
      get().focusWindow(appId);
    } else if (focusedWindowId === appId) {
      get().minimizeWindow(appId);
    } else {
      get().focusWindow(appId);
    }
  },

  toggleMaximize: (appId) => {
    set((state) => {
      const win = state.windows[appId];
      if (!win) return state;

      if (win.isMaximized) {
        const restore = win.restore ?? { position: win.position, size: win.size };
        return {
          windows: {
            ...state.windows,
            [appId]: { ...win, isMaximized: false, position: restore.position, size: restore.size, restore: undefined },
          },
        };
      }

      return {
        windows: {
          ...state.windows,
          [appId]: { ...win, isMaximized: true, restore: { position: win.position, size: win.size } },
        },
      };
    });
    get().focusWindow(appId);
  },

  focusWindow: (appId) => {
    set((state) => {
      const win = state.windows[appId];
      if (!win) return state;
      if (state.focusedWindowId === appId && win.zIndex === state.nextZIndex - 1) {
        return state;
      }
      return {
        windows: { ...state.windows, [appId]: { ...win, zIndex: state.nextZIndex } },
        nextZIndex: state.nextZIndex + 1,
        focusedWindowId: appId,
      };
    });
  },

  commitWindowPosition: (appId, position) => {
    set((state) => {
      const win = state.windows[appId];
      if (!win) return state;
      return { windows: { ...state.windows, [appId]: { ...win, position } } };
    });
  },

  commitWindowSize: (appId, size) => {
    set((state) => {
      const win = state.windows[appId];
      if (!win) return state;
      return { windows: { ...state.windows, [appId]: { ...win, size } } };
    });
  },

  notify: (notification) => {
    notificationSeq += 1;
    const id = `notif-${notificationSeq}`;
    set((state) => ({ notifications: [...state.notifications, { ...notification, id }] }));
  },

  dismissNotification: (id) => {
    set((state) => ({ notifications: state.notifications.filter((n) => n.id !== id) }));
  },
}));

export function isValidAppId(value: string): value is AppId {
  return (appOrder as string[]).includes(value);
}
