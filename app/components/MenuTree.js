"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMenus } from "../redux/slices/menuSlice";

const buildMenuTree = (flatMenus) => {
  const menuMap = {};
  flatMenus.forEach((menu) => {
    menuMap[menu.id] = { ...menu, children: [] };
  });

  const menuTree = [];
  flatMenus.forEach((menu) => {
    if (menu.parentId) {
      menuMap[menu.parentId]?.children.push(menuMap[menu.id]);
    } else {
      menuTree.push(menuMap[menu.id]);
    }
  });

  return menuTree;
};

const MenuItem = ({ menu,onMenuItemClick, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <li
      style={{
        listStyleType: "none",
        marginBottom: "10px",
        position: "relative",
        marginLeft: `${level * 20}px`,
      }}
      onClick={() => onMenuItemClick(menu)}
    >
      {level > 0 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "-18px",
            width: "2px",
            backgroundColor: "#ccc",
            height: "100%",
            zIndex: -1,
          }}
        ></div>
      )}

      <div
        onClick={toggleExpand}
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          fontWeight: menu.children?.length > 0 ? "bold" : "normal",
          position: "relative",
        }}
      >
        {menu.children?.length > 0 && (
          <span style={{ marginRight: "5px" }}>
            {isExpanded ? "▼" : "▶"}
          </span>
        )}
        {menu.name}
      </div>

      {isExpanded && menu.children?.length > 0 && (
        <ul style={{ paddingLeft: "20px", marginTop: "5px" }}>
          {menu.children.map((child) => (
            <MenuItem key={child.id} menu={child} onMenuItemClick={onMenuItemClick} level={level + 1}/>
          ))}
        </ul>
      )}
    </li>
  );
};

export default function MenuTree({onMenuItemClick}) {
  const dispatch = useDispatch();
  const { menus, loading, error } = useSelector((state) => state.menu);

  useEffect(() => {
    dispatch(getMenus());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const hierarchicalMenus = buildMenuTree(menus);

  return (
    <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
      <h2>Menu Tree</h2>
      <ul style={{ paddingLeft: "0", marginTop: "10px" }}>
        {hierarchicalMenus.map((menu) => (
          <MenuItem key={menu.id} menu={menu} onMenuItemClick={onMenuItemClick}/>
        ))}
      </ul>
    </div>
  );
}
