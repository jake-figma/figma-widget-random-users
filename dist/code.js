(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };

  // widget-src/code.tsx
  var { widget, activeUsers, currentUser } = figma;
  var { AutoLayout, Image, SVG, Text, useSyncedMap, useSyncedState } = widget;
  var SVGChevron = `
<svg width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2,2 10,12 2,22" stroke="black" stroke-width="1" stroke-linejoin="round" stroke-linecap="round" />
</svg>
`;
  function Spacer() {
    return /* @__PURE__ */ figma.widget.h(AutoLayout, {
      direction: "vertical",
      height: "fill-parent",
      verticalAlignItems: "center"
    }, /* @__PURE__ */ figma.widget.h(SVG, {
      src: SVGChevron
    }));
  }
  function Item({ key, onClick, photo, name }) {
    const height = 30;
    return /* @__PURE__ */ figma.widget.h(AutoLayout, {
      fill: "#fff",
      height,
      key,
      onClick,
      padding: { right: 10, left: photo ? 0 : 10 },
      spacing: 10,
      stroke: "#000",
      verticalAlignItems: "center",
      width: "fill-parent"
    }, photo ? /* @__PURE__ */ figma.widget.h(Image, {
      height,
      src: photo,
      width: height
    }) : null, /* @__PURE__ */ figma.widget.h(Text, {
      fontSize: 12
    }, name));
  }
  function Random() {
    const [id, setId] = useSyncedState("id", 0);
    const [selection, setSelection] = useSyncedState("selection", null);
    const itemsMap = useSyncedMap("items");
    const addItem = (user) => {
      setId(id + 1);
      const newId = id.toString();
      itemsMap.set(newId, {
        id: newId,
        name: user.name,
        image: user.photoUrl || void 0
      });
    };
    const removeItem = (item) => {
      itemsMap.delete(item.id);
      if (selection && selection.id === item.id) {
        setSelection(null);
      }
    };
    const getRandom = () => {
      const ids = itemsMap.keys();
      const id2 = ids[Math.floor(Math.random() * ids.length)];
      const item = itemsMap.get(id2);
      if (item) {
        setSelection(item);
      }
    };
    const listProps = {
      direction: "vertical",
      height: "fill-parent",
      spacing: 4,
      verticalAlignItems: "center",
      width: "hug-contents"
    };
    const items = itemsMap.values();
    return /* @__PURE__ */ figma.widget.h(AutoLayout, {
      padding: 20,
      spacing: 20
    }, /* @__PURE__ */ figma.widget.h(AutoLayout, __spreadValues({}, listProps), /* @__PURE__ */ figma.widget.h(Item, {
      key: "current-user-join",
      name: "Join!",
      onClick: () => currentUser ? addItem(currentUser) : null
    }), activeUsers.map((user) => /* @__PURE__ */ figma.widget.h(Item, {
      key: user.sessionId,
      photo: user.photoUrl,
      name: user.name,
      onClick: () => addItem(user)
    }))), items.length ? /* @__PURE__ */ figma.widget.h(Spacer, null) : null, items.length ? /* @__PURE__ */ figma.widget.h(AutoLayout, __spreadValues({}, listProps), items.map((item, i) => /* @__PURE__ */ figma.widget.h(Item, {
      key: item.id,
      photo: item.image,
      name: `${item.name} ${item.id}`,
      onClick: () => removeItem(item)
    }))) : null, items.length ? /* @__PURE__ */ figma.widget.h(Spacer, null) : null, items.length ? /* @__PURE__ */ figma.widget.h(AutoLayout, __spreadValues({}, listProps), /* @__PURE__ */ figma.widget.h(Item, {
      key: "random-button",
      name: "Get Random!",
      onClick: getRandom
    })) : null, selection ? /* @__PURE__ */ figma.widget.h(Spacer, null) : null, selection ? /* @__PURE__ */ figma.widget.h(AutoLayout, __spreadValues({}, listProps), /* @__PURE__ */ figma.widget.h(Item, {
      key: selection.id,
      name: `${selection.name} ${selection.id}`,
      photo: selection.image,
      onClick: () => {
      }
    })) : null);
  }
  widget.register(Random);
})();
