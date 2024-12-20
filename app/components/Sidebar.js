export default function Sidebar() {
    return (
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="px-6 py-4 font-bold text-lg">CLO<span className="text-blue-500">IT</span></div>
        <nav className="flex-1 px-4 py-2">
          <ul className="space-y-2">
            <li className="text-sm text-gray-300">Systems</li>
            <li>
              <button className="w-full text-left text-gray-200 hover:text-white py-2">
                <span>System Code</span>
              </button>
            </li>
            <li>
              <button className="w-full text-left text-gray-200 hover:text-white py-2">
                <span>Properties</span>
              </button>
            </li>
            <li>
              <button className="w-full text-left bg-green-600 py-2 rounded">
                <span>Menus</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    );
  }
  