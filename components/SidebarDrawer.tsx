import React from 'react';
import { Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Album, Home, QueueMusic } from '@mui/icons-material';
import { useRouter } from 'next/router';

const iconMap = [<Home sx={{ color: '#8e2de2' }} />, <QueueMusic sx={{ color: '#8e2de2' }} />,
<Album sx={{ color: '#8e2de2' }} />, <PlaylistPlayIcon sx={{ color: '#8e2de2' }} />];

const SidebarDrawer = React.forwardRef<HTMLDivElement, {
  open: boolean;
  onClose: () => void;
  menuItems: { text: string; href: string }[];
}>(({ open, onClose, menuItems }, ref) => {
  const router = useRouter();

  return (
    <Drawer
      ref={ref}
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        '& .MuiDrawer-paper': {
          backgroundImage: 'url("/images/sidebar-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: '#fff',
        },
      }}
    >
      <div>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <List sx={{ padding: 0 }}>
        {menuItems.map(({ text, href }, index) => (
          <ListItem key={href} disablePadding sx={{ marginBottom: 1 }}>
            <ListItemButton
              onClick={() => router.push(href)}
              sx={{
                padding: '10px 20px',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: '40px' }}>
                {iconMap[index] || null}
              </ListItemIcon>
              <ListItemText
                primary={text}
                sx={{
                  fontWeight: 500,
                  color: '#333',
                  fontSize: '16px',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
});

SidebarDrawer.displayName = 'SidebarDrawer';

export default SidebarDrawer;