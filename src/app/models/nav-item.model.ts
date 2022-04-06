export interface DropdownItem {
    path: string;
    name: string;
}
export interface NavItem {
    type: 'dropdown' | 'link';
    path: string | DropdownItem[];
    name: string;
}