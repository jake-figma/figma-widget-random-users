const { widget, activeUsers, currentUser } = figma;
const { AutoLayout, Image, SVG, Text, useSyncedMap, useSyncedState } = widget;

interface RandomItem {
  id: string;
  name: string;
  image?: string;
}

const SVGChevron = `
<svg width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2,2 10,12 2,22" stroke="black" stroke-width="1" stroke-linejoin="round" stroke-linecap="round" />
</svg>
`;

interface ItemProps {
  key: string | number;
  onClick(): void;
  photo?: string | null;
  name: string;
}

function Spacer() {
  return (
    <AutoLayout
      direction="vertical"
      height="fill-parent"
      verticalAlignItems="center"
    >
      <SVG src={SVGChevron} />
    </AutoLayout>
  );
}

function Item({ key, onClick, photo, name }: ItemProps) {
  const height = 30;
  return (
    <AutoLayout
      fill="#fff"
      height={height}
      key={key}
      onClick={onClick}
      padding={{ right: 10, left: photo ? 0 : 10 }}
      spacing={10}
      stroke="#000"
      verticalAlignItems="center"
      width="fill-parent"
    >
      {photo ? <Image height={height} src={photo} width={height} /> : null}
      <Text fontSize={12}>{name}</Text>
    </AutoLayout>
  );
}

function Random() {
  const [id, setId] = useSyncedState<number>("id", 0);
  const [selection, setSelection] = useSyncedState<RandomItem | null>(
    "selection",
    null
  );
  const itemsMap = useSyncedMap<RandomItem>("items");
  const addItem = (user: ActiveUser | User) => {
    setId(id + 1);
    const newId = id.toString();
    itemsMap.set(newId, {
      id: newId,
      name: user.name,
      image: user.photoUrl || undefined,
    });
  };
  const removeItem = (item: RandomItem) => {
    itemsMap.delete(item.id);
    if (selection && selection.id === item.id) {
      setSelection(null);
    }
  };
  const getRandom = () => {
    const ids = itemsMap.keys();
    const id = ids[Math.floor(Math.random() * ids.length)];
    const item = itemsMap.get(id);
    if (item) {
      setSelection(item);
    }
  };
  const listProps: AutoLayoutProps = {
    direction: "vertical",
    height: "fill-parent",
    spacing: 4,
    verticalAlignItems: "center",
    width: "hug-contents",
  };

  const items = itemsMap.values();
  return (
    <AutoLayout padding={20} spacing={20}>
      <AutoLayout {...listProps}>
        <Item
          key="current-user-join"
          name="Join!"
          onClick={() => (currentUser ? addItem(currentUser) : null)}
        />
        {activeUsers.map((user) => (
          <Item
            key={user.sessionId}
            photo={user.photoUrl}
            name={user.name}
            onClick={() => addItem(user)}
          />
        ))}
      </AutoLayout>
      {items.length ? <Spacer /> : null}
      {items.length ? (
        <AutoLayout {...listProps}>
          {items.map((item, i) => (
            <Item
              key={item.id}
              photo={item.image}
              name={`${item.name} ${item.id}`}
              onClick={() => removeItem(item)}
            />
          ))}
        </AutoLayout>
      ) : null}
      {items.length ? <Spacer /> : null}
      {items.length ? (
        <AutoLayout {...listProps}>
          <Item key="random-button" name="Get Random!" onClick={getRandom} />
        </AutoLayout>
      ) : null}
      {selection ? <Spacer /> : null}
      {selection ? (
        <AutoLayout {...listProps}>
          <Item
            key={selection.id}
            name={`${selection.name} ${selection.id}`}
            photo={selection.image}
            onClick={() => {}}
          />
        </AutoLayout>
      ) : null}
    </AutoLayout>
  );
}

widget.register(Random);
