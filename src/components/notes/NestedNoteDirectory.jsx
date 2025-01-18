import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, File } from 'lucide-react';
import './NestedNoteDirectory.css';

const TreeNode = ({ node, level = 0, selectedFile, onSelectFile }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const isFolder = node.type === 'folder';

    const handleToggle = (e) => {
        if (isFolder) {
            setIsExpanded(!isExpanded);
        } else {
            onSelectFile(node);
        }
        e.stopPropagation();
    };

    const handleDelete = () => {
        console.log('delete node: ', node)
    }

    const handleAdd = () => {

    }

    const isSelected = !isFolder && selectedFile?.name === node.name;

    return (
        <div>
            <div
                className={`tree-node ${isFolder ? 'folder' : ''} ${isFolder && isExpanded ? 'expanded' : ''} ${isSelected ? 'selected' : ''}`}
                style={{ paddingLeft: `${level * 20}px` }}

                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="node-container-left" onClick={handleToggle}>
                    {isFolder && (
                        <span className="chevron">
                            {isExpanded ? (
                                <ChevronDown className="icon" />
                            ) : (
                                <ChevronRight className="icon" />
                            )}
                        </span>
                    )}
                    {isFolder ? (
                        <Folder className="folder-icon icon" />
                    ) : (
                        <File className="file-icon icon" />
                    )}
                    <span className="tree-node-name">{node.name}</span>
                </div>
                <div className="node-container-right">

                    {(isHovered && node.name !== 'root') && <span onClick={handleDelete} className="delete-option">x</span>}
                </div>
            </div>
            {isFolder && isExpanded && (
                <div>
                    {node.children?.map((child, index) => (
                        <TreeNode
                            key={`${child.name}-${index}`}
                            node={child}
                            level={level + 1}
                            selectedFile={selectedFile}
                            onSelectFile={onSelectFile}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const NestedNoteDirectory = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const fileStructure = {
        name: 'root',
        type: 'folder',
        children: [
            {
                name: 'src',
                type: 'folder',
                children: [
                    {
                        name: 'components',
                        type: 'folder',
                        children: [
                            { name: 'TreeView.jsx', type: 'file' },
                            { name: 'Header.jsx', type: 'file' },
                        ],
                    },
                    { name: 'App.js', type: 'file' },
                    { name: 'index.js', type: 'file' },
                ],
            },
            {
                name: 'public',
                type: 'folder',
                children: [
                    { name: 'index.html', type: 'file' },
                    { name: 'favicon.ico', type: 'file' },
                ],
            },
            { name: 'package.json', type: 'file' },
            { name: 'README.md', type: 'file' },
        ],
    };

    return (
        <div className="directory-container">
            <TreeNode
                node={fileStructure}
                selectedFile={selectedFile}
                onSelectFile={setSelectedFile}
            />
        </div>
    );
};

export default NestedNoteDirectory;
