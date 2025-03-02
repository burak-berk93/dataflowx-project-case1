import  { useEffect, useState } from 'react';
import ReactFlow, { MiniMap, Controls, Background, Node, Edge, NodeDragHandler } from 'reactflow';
import { useTeamContext } from '../context/TeamContext';
import 'reactflow/dist/style.css';
import { Box, Typography, Paper, Grid } from '@mui/material';

const Orders: React.FC = () => {
  const { removeUserFromTeam } = useTeamContext();

  const { teams } = useTeamContext();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [hiddenTeams, setHiddenTeams] = useState<Set<string>>(new Set());

  // Düğümler sürüklendiğinde pozisyonları güncelle
  const onNodeDragStop: NodeDragHandler = (_, node) => {
    setNodes((prevNodes) =>
      prevNodes.map((n) =>
        n.id === node.id ? { ...n, position: node.position } : n
      )
    );
  };

  // Sağ tıklama ile kullanıcıları göster/gizle
  const onNodeContextMenu = (event: React.MouseEvent, node: Node) => {
    event.preventDefault();
    const teamId = node.id;
    console.log("Right-clicked node ID:", node.id); // ID'yi konsola yazdır

    if (node.id.startsWith("user-")) {
      const userId = node.id.replace("user-", ""); // "user-" kısmını kaldır
      removeUserFromTeam(userId); // Kullanıcıyı sil
    }
    setHiddenTeams((prevHiddenTeams) => {
      const updatedHiddenTeams = new Set(prevHiddenTeams);
      if (updatedHiddenTeams.has(teamId)) {
        updatedHiddenTeams.delete(teamId);
      } else {
        updatedHiddenTeams.add(teamId);
      }
      return updatedHiddenTeams;
    });
  };

  useEffect(() => {
    if (!teams || teams.length === 0) return;

    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];

    let currentYOffset = 100; // İlk takımın başlangıç yüksekliği

    teams.forEach((team, index) => {
      const teamId = `team-${team.id}`;

      // Takım düğümü
      newNodes.push({
        id: teamId,
        data: { label: team.name, createdAt: team.createdAt },
        position: { x: 200 * index, y: currentYOffset },
        style: {
          backgroundColor: '#1976d2',
          color: '#fff',
          borderRadius: '8px',
          padding: '10px',
          textAlign: 'center',
          cursor: 'context-menu',
        },
      });

      let teamYOffset = currentYOffset + 120; // Kullanıcı düğümlerinin başlangıç Y değeri

      if (!hiddenTeams.has(teamId)) {
        team.users.forEach((user) => {
          const userId = `user-${user.id}`;

          // Kullanıcı düğümü
          newNodes.push({
            id: userId,
            data: {
              label: user.name,
              email: user.email,
              phone: user.phone,
              image: user.images ? URL.createObjectURL(user.images) : '',
            },
            position: { x: 300 * index, y: teamYOffset },
            style: {
              backgroundColor: '#eeeeee',
              borderRadius: '8px',
              padding: '10px',
              textAlign: 'center',
            },
          });

          // Takımdan kullanıcıya bağlantı (edge)
          newEdges.push({
            id: `edge-${team.id}-${user.id}`,
            source: teamId,
            target: userId,
            type: 'smoothstep',
            animated: true,
            style: { stroke: '#ff0077', strokeWidth: 2 },
          });

          teamYOffset += 50; // Bir sonraki kullanıcı için Y konumunu artır
        });
      }

      currentYOffset = 100; // Son kullanıcının altına boşluk bırak
    });

    setNodes(newNodes);
    setEdges(newEdges);
  }, [teams, hiddenTeams]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '80vh', background: '#000', overflow: 'hidden', marginTop:2 }}>
      {/* Header Section */}
      <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem' }, textAlign: 'center', color: '#fff' }}>
        Team Overview
      </Typography>

      {/* ReactFlow Diagram */}
      <Box sx={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'auto' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          onNodeDragStop={onNodeDragStop}
          onNodeContextMenu={(event, node) => onNodeContextMenu(event, node)}
        >
          <MiniMap />
          <Controls />
          <Background color="#ddd" gap={16} />
        </ReactFlow>
      </Box>

      {/* Team List */}
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.25rem' }, marginBottom: 2 }}>
          Teams and Users
        </Typography>
        <Grid container spacing={3}>
          {teams.map((team) => (
            <Grid item xs={12} sm={6} md={4} key={team.id}>
              <Paper sx={{ padding: 2, backgroundColor: '#f0f0f0' }}>
                <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>{team.name}</Typography>
                <ul>
                  {team.users.map((user) => (
                    <li key={user.id}>
                      {user.name} - {user.email} - {user.phone}
                    </li>
                  ))}
                </ul>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Orders;
