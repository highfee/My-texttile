"use client";
import { create } from "zustand";

export const views = ["front", "back", "left", "right"];

const initialObjectsState = { front: [], back: [], left: [], right: [] };
const initialHistoryState = {
  front: [[]],
  back: [[]],
  left: [[]],
  right: [[]],
};
const initialGarmentImagesState = {
  front: null,
  back: null,
  left: null,
  right: null,
};

export const useDesignStore = create((set, get) => ({
  stageRef: null,
  activeView: "front",
  objects: initialObjectsState,
  history: initialHistoryState,
  historyStep: 0,
  selectedId: null,
  zoom: 1,
  garmentImages: initialGarmentImagesState,
  contextMenu: { visible: false, x: 0, y: 0 },

  setStageRef: (ref) => set({ stageRef: ref }),

  setActiveView: (view) =>
    set((state) => {
      const newHistory = state.history[view];
      return {
        activeView: view,
        selectedId: null,
        historyStep: newHistory.length - 1,
      };
    }),

  _pushHistory: () => {
    const { activeView, objects, history, historyStep } = get();
    const currentViewObjects = objects[activeView];
    const currentViewHistory = history[activeView].slice(0, historyStep + 1);
    currentViewHistory.push(currentViewObjects);

    set((state) => ({
      history: { ...state.history, [activeView]: currentViewHistory },
      historyStep: currentViewHistory.length - 1,
    }));
  },

  addObject: (type, options = {}) => {
    const { activeView, objects, zoom, stageRef } = get();
    const stage = stageRef?.current;
    if (!stage) return;

    const center = {
      x: stage.width() / 2 / zoom,
      y: stage.height() / 2 / zoom,
    };

    const id = `${type}-${Date.now()}`;
    let newElement;

    switch (type) {
      case "text":
        newElement = {
          id,
          type,
          x: center.x - 50,
          y: center.y - 20,
          text: "Hello",
          fontSize: 30,
          fill: "#000000",
          name: "Text",
          fontWeight: "normal",
          fontStyle: "normal",
          fontFamily: "PT Sans",
          ...options,
        };
        break;
      case "image":
        newElement = {
          id,
          type,
          x: center.x - 50,
          y: center.y - 50,
          width: 100,
          height: 100,
          src: "https://placehold.co/100x100.png",
          name: "Image",
          ...options,
        };
        break;
      case "rect":
        newElement = {
          id,
          type,
          x: center.x - 50,
          y: center.y - 50,
          width: 100,
          height: 100,
          fill: "#A9A9A9",
          name: "Rectangle",
          ...options,
        };
        break;
      case "path":
        newElement = {
          id,
          type,
          x: center.x,
          y: center.y,
          fill: "#A9A9A9",
          scaleX: 2,
          scaleY: 2,
          name: "Shape",
          ...options,
        };
        break;
      default:
        return;
    }

    const currentViewObjects = [...objects[activeView], newElement];
    set((state) => ({
      objects: { ...state.objects, [activeView]: currentViewObjects },
      selectedId: id,
    }));
    get()._pushHistory();
  },

  updateObject: (id, properties) => {
    const { activeView, objects } = get();
    const newObjects = objects[activeView].map((obj) =>
      obj.id === id ? { ...obj, ...properties } : obj
    );
    set((state) => ({
      objects: { ...state.objects, [activeView]: newObjects },
    }));
  },

  deleteObject: (id) => {
    if (!id) return;
    const { activeView, objects } = get();
    const newObjects = objects[activeView].filter((o) => o.id !== id);
    set((state) => ({
      objects: { ...state.objects, [activeView]: newObjects },
      selectedId: null,
    }));
    get()._pushHistory();
  },

  cloneObject: (id) => {
    if (!id) return;
    const { activeView, objects } = get();
    const original = objects[activeView].find((o) => o.id === id);
    if (!original) return;

    const newObj = {
      ...original,
      id: `${original.type}-${Date.now()}`,
      x: (original.x || 0) + 10,
      y: (original.y || 0) + 10,
    };
    const newObjects = [...objects[activeView], newObj];
    set((state) => ({
      objects: { ...state.objects, [activeView]: newObjects },
      selectedId: newObj.id,
    }));
    get()._pushHistory();
  },

  setSelectedId: (id) => set({ selectedId: id }),

  moveLayer: (direction) => {
    const { activeView, objects, selectedId } = get();
    if (!selectedId) return;
    const index = objects[activeView].findIndex((o) => o.id === selectedId);
    if (index === -1) return;

    const newObjects = [...objects[activeView]];
    const [item] = newObjects.splice(index, 1);

    if (direction === "front") newObjects.push(item);
    else if (direction === "back") newObjects.unshift(item);
    else if (direction === "up" && index < newObjects.length)
      newObjects.splice(index + 1, 0, item);
    else if (direction === "down" && index > 0)
      newObjects.splice(index - 1, 0, item);
    else return;

    set((state) => ({
      objects: { ...state.objects, [activeView]: newObjects },
    }));
    get()._pushHistory();
  },

  undo: () => {
    const { activeView, history, historyStep } = get();
    if (historyStep <= 0) return;
    const newStep = historyStep - 1;
    set((state) => ({
      objects: { ...state.objects, [activeView]: history[activeView][newStep] },
      historyStep: newStep,
      selectedId: null,
    }));
  },

  redo: () => {
    const { activeView, history, historyStep } = get();
    if (historyStep >= history[activeView].length - 1) return;
    const newStep = historyStep + 1;
    set((state) => ({
      objects: { ...state.objects, [activeView]: history[activeView][newStep] },
      historyStep: newStep,
      selectedId: null,
    }));
  },

  setZoom: (zoom) => set({ zoom }),

  setGarmentImage: (view, image) => {
    set((state) => ({
      garmentImages: { ...state.garmentImages, [view]: image },
    }));
  },

  clearCanvas: () => {
    const { activeView } = get();
    set((state) => ({
      objects: { ...state.objects, [activeView]: [] },
      selectedId: null,
    }));
    get()._pushHistory();
  },

  getDesignData: () => {
    const { objects, garmentImages } = get();
    return JSON.stringify({ objects, garmentImages }, null, 2);
  },

  showContextMenu: (x, y) => set({ contextMenu: { visible: true, x, y } }),
  hideContextMenu: () =>
    set((state) => ({ contextMenu: { ...state.contextMenu, visible: false } })),
}));

// A wrapper action for property panel updates
export const useUpdateObjectAndHistory = () => {
  const state = useDesignStore();
  return (id, properties) => {
    state.updateObject(id, properties);
    state._pushHistory();
  };
};
