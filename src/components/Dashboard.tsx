import  { useState, useEffect } from 'react';
import { useTeamContext } from '../context/TeamContext';
import { Team, User } from '../types/TeamTypes'; // Team ve User tiplerini import ediyoruz

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import {
  TextField, Button, Box, Typography, Card, CardContent, Grid, Select,
  MenuItem, InputLabel, FormControl, Avatar, Stack, Snackbar, Alert, CardMedia
} from '@mui/material';

const Dashboard: React.FC = () => {
  const { teams, addTeam, addUserToTeam } = useTeamContext(); // Context'ten alınan fonksiyonlar
  const [teamName, setTeamName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPhone, setUserPhone] = useState<string>('');
  const [userImages, setUserImages] = useState<File | null>(null);
  const [userDescription, setUserDescription] = useState<string>('');
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  // Snackbar için state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [errors, setErrors] = useState({
    userName: false,
    userEmail: false,
    userPhone: false,
    selectedTeam: false,
  });
  useEffect(() => {
    if (userImages) {
      const objectUrl = URL.createObjectURL(userImages);
      setImagePreview(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl); // Bellek sızıntısını önler
      };
    }
  }, [userImages]);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Create Team Section */}
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Create Team
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              label="Team Name"
              variant="outlined"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => { addTeam(teamName); setTeamName(''); }}
              sx={{ minWidth: 180, p: 1 }} // Butonu genişlettik ve padding ekledik
            >
              Add Team
            </Button>
          </Box>
        </CardContent>
      </Card>


      {/* Add User to Team Section */}
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Add User to Team
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Select Team</InputLabel>
                <Select
                  value={selectedTeam || ''}
                  onChange={(e) => setSelectedTeam(Number(e.target.value))}
                  label="Select Team"
                >
                  <MenuItem value="">
                    <em>Select a Team</em>
                  </MenuItem>
                  {teams.map((team: Team) => (
                    <MenuItem key={team.id} value={team.id}>
                      {team.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name Surname"
                variant="outlined"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                fullWidth

                error={errors.userName}

                helperText={!userName && "This field is required"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="E-Mail"
                variant="outlined"
                value={userEmail}
                error={errors.userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                helperText={errors.userEmail && "This field is required"}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone No"
                variant="outlined"
                value={userPhone}
                error={errors.userPhone || !/^\+?\d{10,15}$/.test(userPhone)}
                onChange={(e) => {
                  const input = e.target.value;
                  if (/^\+?\d*$/.test(input)) { // Sadece rakam veya başında + olan değerleri kabul et
                    setUserPhone(input);
                  }
                }}
                helperText={
                  errors.userPhone
                    ? "Phone number is required"
                    : !/^\+?\d{10,15}$/.test(userPhone)
                      ? "Enter a valid phone number (10-15 digits, optional +)"
                      : ""
                }
                fullWidth
                type="tel" // Telefon giriş tipi
                slotProps={{ input: { inputMode: "tel" } }} // Mobil cihazlar için telefon klavyesini açar
              />


            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                value={userDescription}
                onChange={(e) => setUserDescription(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={2} alignItems="center">
                {/* Avatar ile Görsel Önizleme */}
                <Avatar src={imagePreview || undefined} sx={{ width: 80, height: 80 }}>
                  {!imagePreview && "?"}
                </Avatar>

                {/* Dosya Yükleme Butonu */}
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<CloudUploadIcon />}
                >
                  Fotoğraf Yükle
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];

                        // Sadece resim dosyalarını kabul et
                        if (!file.type.startsWith("image/")) {
                          alert("Lütfen bir resim dosyası seçin!");
                          return;
                        }

                        setUserImages(file);
                      }
                    }}
                  />
                </Button>

                {/* Dosya Adı Gösterme */}
                {userImages && (
                  <Typography variant="body2" color="textSecondary">
                    Seçilen Dosya: {userImages.name}
                  </Typography>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  const newErrors = {
                    userName: !userName.trim(),
                    userEmail: !userEmail.trim(),
                    userPhone: !userPhone.trim() || !/^\+?\d{10,15}$/.test(userPhone),
                    selectedTeam: selectedTeam === null,
                  };

                  setErrors(newErrors);

                  if (Object.values(newErrors).some((error) => error)) {
                    setSnackbarMessage("Please fill in all required fields correctly!");
                    setSnackbarOpen(true);
                    return;
                  }

                  // Eğer tüm alanlar doluysa kullanıcıyı ekle
                  addUserToTeam(
                    selectedTeam!,
                    userName,
                    userEmail,
                    userPhone,
                    userImages,
                    new Date(),
                    userDescription
                  );

                  // State'leri sıfırla
                  setUserName("");
                  setUserEmail("");
                  setUserPhone("");
                  setUserDescription("");
                  setUserImages(null);
                  setSelectedTeam(null);
                  setImagePreview(null);
                  setErrors({ userName: false, userEmail: false, userPhone: false, selectedTeam: false });
                }}
              >
                Add User
              </Button>

              {/* Snackbar Bileşeni */}
              <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert onClose={() => setSnackbarOpen(false)} severity="error" sx={{ width: "100%" }}>
                  {snackbarMessage}
                </Alert>
              </Snackbar>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Teams Display Section */}
      <Typography variant="h6" gutterBottom>
        Teams
      </Typography>
      <Grid container spacing={3}>
      {teams.map((team: Team) => (
        <Grid item xs={12} sm={6} md={4} key={team.id}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h6" gutterBottom>
                {team.name}
              </Typography>

              <ul>
                {team.users.map((user: User) => (
                  <li key={user.id}>
                    <Card sx={{ display: 'flex', flexDirection: 'column', marginBottom: 2 }}>
                      {/* Resim */}
                      {user.images && (
                        <CardMedia
                          component="img"
                          height="140"
                          image={URL.createObjectURL(user.images)}
                          alt={user.name}
                          sx={{ objectFit: 'cover', borderRadius: '8px' }}
                        />
                      )}

                      <CardContent>
                        <Typography variant="body1" gutterBottom>
                          {user.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Email: {user.email || 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Phone: {user.phone || 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Created At: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                        </Typography>
                        {user.Description && (
                          <Typography variant="body2" color="text.secondary">
                            Description: {user.Description}
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    </Box>
  );
};

export default Dashboard;
