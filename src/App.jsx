import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Chip,
  Card,
  CardContent,
  Grid,
  Paper,
  LinearProgress,
  Alert,
  Fade,
  Slide,
  IconButton,
  Badge,
  Tooltip,
  InputAdornment,
  Stack,
  Divider,
  Avatar,
} from "@mui/material";
import {
  TrendingUp,
  Analytics,
  Article,
  Work,
  Search,
  Refresh,
  CheckCircle,
  Warning,
  Info,
  Add,
  Clear,
  ShowChart,
  AutoAwesome,
  Article as Newspaper,
} from "@mui/icons-material";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { keyframes } from "@mui/system";

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const floatingAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const modernTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3b82f6",
      light: "#60a5fa",
      dark: "#1e40af",
    },
    secondary: {
      main: "#8b5cf6",
      light: "#a78bfa",
      dark: "#7c3aed",
    },
    background: {
      default: "#0f172a",
      paper: "rgba(30, 41, 59, 0.8)",
    },
    text: {
      primary: "#f8fafc",
      secondary: "#cbd5e1",
    },
    success: {
      main: "#10b981",
      light: "#34d399",
    },
    warning: {
      main: "#f59e0b",
      light: "#fbbf24",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontWeight: 800,
      fontSize: "3.5rem",
      background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #10b981 100%)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    h4: {
      fontWeight: 700,
      color: "#f8fafc",
    },
    h5: {
      fontWeight: 600,
      color: "#f8fafc",
    },
    h6: {
      fontWeight: 600,
      color: "#e2e8f0",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.7,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: "rgba(30, 41, 59, 0.7)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(59, 130, 246, 0.1)",
          borderRadius: "20px",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: "0 25px 50px rgba(59, 130, 246, 0.15)",
            border: "1px solid rgba(59, 130, 246, 0.3)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "14px",
          textTransform: "none",
          fontWeight: 600,
          padding: "14px 28px",
          fontSize: "1rem",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          overflow: "hidden",
        },
        contained: {
          background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
          boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)",
          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: "0 12px 35px rgba(59, 130, 246, 0.4)",
          },
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "100%",
            height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
            transition: "left 0.5s",
          },
          "&:hover:before": {
            left: "100%",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          background: "rgba(59, 130, 246, 0.1)",
          border: "1px solid rgba(59, 130, 246, 0.3)",
          color: "#60a5fa",
          fontWeight: 500,
          padding: "4px 0",
          transition: "all 0.3s ease",
          "&:hover": {
            background: "rgba(59, 130, 246, 0.2)",
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "16px",
            background: "rgba(30, 41, 59, 0.6)",
            backdropFilter: "blur(10px)",
            fontSize: "1rem",
            "& fieldset": {
              borderColor: "rgba(59, 130, 246, 0.3)",
              borderWidth: "1px",
            },
            "&:hover fieldset": {
              borderColor: "rgba(59, 130, 246, 0.5)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#3b82f6",
              borderWidth: "2px",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#cbd5e1",
            "&.Mui-focused": {
              color: "#3b82f6",
            },
          },
        },
      },
    },
  },
});

export default function App() {
  const [news, setNews] = useState([]);
  const [portfolioInput, setPortfolioInput] = useState("");
  const [portfolio, setPortfolio] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [newsLoading, setNewsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    if (portfolio.length === 0) {
      setFiltered([]);
      return;
    }

    const matches = news.filter((n) =>
      portfolio.some((sym) => n.title.toUpperCase().includes(sym.toUpperCase()))
    );
    setFiltered(matches.map((n) => n.title));
  }, [portfolio, news]);

  const fetchNews = async () => {
    setNewsLoading(true);
    setError("");
    try {
      const res = await axios.get("/api/news");
      setNews(res.data.headlines);
    } catch (err) {
      setError("Failed to fetch news. Please try again.");
      console.error("News fetch failed:", err.message);
    } finally {
      setNewsLoading(false);
    }
  };

  const handlePortfolioSubmit = () => {
    if (!portfolioInput.trim()) return;

    const symbols = portfolioInput
      .split(",")
      .map((s) => s.trim().toUpperCase())
      .filter((s) => s.length > 0);
    
    // Add only unique symbols
    const uniqueSymbols = [...new Set([...portfolio, ...symbols])];
    setPortfolio(uniqueSymbols);
    setPortfolioInput("");
  };

  const handleAnalyze = async () => {
    if (portfolio.length === 0) {
      setError("Please add stocks to your portfolio first.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await axios.post("/api/analyze", {
        portfolio,
        filteredNews: filtered,
      });
      setAnalysis(res.data.analysis);
    } catch (err) {
      setError("Analysis failed. Please try again.");
      console.error("Analysis failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeFromPortfolio = (symbolToRemove) => {
    setPortfolio(portfolio.filter((sym) => sym !== symbolToRemove));
  };

  const clearPortfolio = () => {
    setPortfolio([]);
    setAnalysis("");
  };

  return (
    <ThemeProvider theme={modernTheme}>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          position: "relative",
          overflowX: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)",
            pointerEvents: "none",
          },
        }}
      >
        <Container
          maxWidth="xl"
          sx={{ 
            py: 6,
            px: { xs: 2, sm: 4, md: 6 },
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Enhanced Header */}
          <Fade in timeout={1000}>
            <Box textAlign="center" mb={6}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 3,
                  animation: `${floatingAnimation} 3s ease-in-out infinite`,
                }}
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                    mr: 3,
                  }}
                >
                  <ShowChart sx={{ fontSize: 40 }} />
                </Avatar>
                <Typography
                  variant="h2"
                  sx={{
                    animation: `${gradientAnimation} 4s ease infinite`,
                    backgroundSize: "200% 200%",
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                    fontWeight: 800,
                  }}
                >
                  Portfolio Analytics
                </Typography>
              </Box>
              
              <Typography 
                variant="h6" 
                color="text.secondary" 
                sx={{ 
                  mb: 4,
                  maxWidth: 600,
                  mx: "auto",
                  fontSize: { xs: "1rem", md: "1.25rem" }
                }}
              >
                Harness the power of AI to make smarter investment decisions with real-time market intelligence
              </Typography>
              
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                flexWrap="wrap"
                sx={{ gap: 2 }}
              >
                <Chip
                  icon={<TrendingUp />}
                  label="Market Intelligence"
                  size="medium"
                  sx={{ fontSize: "0.875rem", py: 2 }}
                />
                <Chip
                  icon={<AutoAwesome />}
                  label="AI-Powered Analysis"
                  size="medium"
                  sx={{ fontSize: "0.875rem", py: 2 }}
                />
                <Chip
                  icon={<Newspaper />}
                  label="Live News Feed"
                  size="medium"
                  sx={{ fontSize: "0.875rem", py: 2 }}
                />
              </Stack>
            </Box>
          </Fade>

          {/* Error Alert */}
          {error && (
            <Fade in>
              <Alert
                severity="error"
                onClose={() => setError("")}
                sx={{ 
                  mb: 4, 
                  borderRadius: 3,
                  fontSize: "1rem",
                  "& .MuiAlert-message": {
                    fontSize: "1rem",
                  },
                }}
              >
                {error}
              </Alert>
            </Fade>
          )}

          <Grid container spacing={4}>
            {/* Enhanced Portfolio Management */}
            <Grid item xs={12} lg={6}>
              <Slide direction="right" in timeout={800}>
                <Card sx={{ height: "fit-content" }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box display="flex" alignItems="center" mb={3}>
                      <Avatar
                        sx={{
                          bgcolor: "primary.main",
                          mr: 2,
                          width: 48,
                          height: 48,
                        }}
                      >
                        <Work  />
                      </Avatar>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                          Portfolio Management
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Add and manage your stock symbols
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <TextField
                        fullWidth
                        label="Enter stock symbols (TCS, INFY, RELIANCE...)"
                        variant="outlined"
                        value={portfolioInput}
                        onChange={(e) => setPortfolioInput(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handlePortfolioSubmit()
                        }
                        placeholder="Separate multiple symbols with commas"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Search color="primary" />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title="Add to portfolio">
                                <IconButton
                                  onClick={handlePortfolioSubmit}
                                  color="primary"
                                  disabled={!portfolioInput.trim()}
                                  sx={{
                                    bgcolor: portfolioInput.trim() ? "primary.main" : "transparent",
                                    color: portfolioInput.trim() ? "white" : "inherit",
                                    "&:hover": {
                                      bgcolor: portfolioInput.trim() ? "primary.dark" : "transparent",
                                    },
                                  }}
                                >
                                  <Add />
                                </IconButton>
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            fontSize: "1rem",
                            py: 0.5,
                          },
                        }}
                      />
                    </Box>

                    {portfolio.length > 0 && (
                      <Box>
                        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                          <Typography variant="h6" color="text.secondary">
                            Your Portfolio ({portfolio.length})
                          </Typography>
                          <Tooltip title="Clear all">
                            <IconButton
                              onClick={clearPortfolio}
                              size="small"
                              sx={{ color: "text.secondary" }}
                            >
                              <Clear />
                            </IconButton>
                          </Tooltip>
                        </Box>
                        
                        <Box display="flex" flexWrap="wrap" gap={1.5}>
                          {portfolio.map((sym, i) => (
                            <Chip
                              key={i}
                              label={sym}
                              onDelete={() => removeFromPortfolio(sym)}
                              color="primary"
                              variant="outlined"
                              sx={{
                                fontSize: "0.875rem",
                                "& .MuiChip-deleteIcon": {
                                  color: "inherit",
                                },
                              }}
                            />
                          ))}
                        </Box>

                        <Alert 
                          severity="success" 
                          sx={{ 
                            mt: 2, 
                            borderRadius: 2,
                            bgcolor: "rgba(16, 185, 129, 0.1)",
                            border: "1px solid rgba(16, 185, 129, 0.2)",
                            "& .MuiAlert-icon": {
                              color: "success.main",
                            },
                          }}
                        >
                          <Typography variant="body2">
                            Successfully tracking {portfolio.length} stocks in your portfolio
                          </Typography>
                        </Alert>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Slide>
            </Grid>

            {/* Enhanced AI Analysis */}
            <Grid item xs={12} lg={6}>
              <Slide direction="left" in timeout={800}>
                <Card sx={{ height: "fit-content" }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box display="flex" alignItems="center" mb={3}>
                      <Avatar
                        sx={{
                          bgcolor: "secondary.main",
                          mr: 2,
                          width: 48,
                          height: 48,
                        }}
                      >
                        <AutoAwesome />
                      </Avatar>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                          AI Analysis
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Get intelligent insights on your portfolio
                        </Typography>
                      </Box>
                    </Box>

                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleAnalyze}
                      disabled={loading || portfolio.length === 0}
                      sx={{ 
                        mb: 3, 
                        py: 2,
                        fontSize: "1rem",
                        fontWeight: 600,
                      }}
                    >
                      {loading ? "Analyzing Market Impact..." : "🚀 Analyze News Impact"}
                    </Button>

                    {loading && (
                      <Box sx={{ mb: 3 }}>
                        <LinearProgress 
                          sx={{ 
                            borderRadius: 2,
                            height: 8,
                            bgcolor: "rgba(59, 130, 246, 0.1)",
                            "& .MuiLinearProgress-bar": {
                              bgcolor: "primary.main",
                              borderRadius: 2,
                            },
                          }} 
                        />
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: "center" }}>
                          Processing market data and news sentiment...
                        </Typography>
                      </Box>
                    )}

                    {analysis && (
                      <Fade in>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 3,
                            bgcolor: "rgba(59, 130, 246, 0.05)",
                            border: "1px solid rgba(59, 130, 246, 0.2)",
                            borderRadius: 3,
                            position: "relative",
                            "&::before": {
                              content: '""',
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              height: "3px",
                              background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                              borderRadius: "3px 3px 0 0",
                            },
                          }}
                        >
                          <Box display="flex" alignItems="center" mb={2}>
                            <AutoAwesome sx={{ mr: 1, color: "primary.light" }} />
                            <Typography
                              variant="h6"
                              sx={{ color: "primary.light", fontWeight: 600 }}
                            >
                              AI Market Insights
                            </Typography>
                          </Box>
                          <Typography
                            variant="body1"
                            sx={{ 
                              whiteSpace: "pre-line", 
                              lineHeight: 1.7,
                              color: "text.primary",
                            }}
                          >
                            {analysis}
                          </Typography>
                        </Paper>
                      </Fade>
                    )}
                  </CardContent>
                </Card>
              </Slide>
            </Grid>

            {/* Enhanced News Feed */}
            <Grid item xs={12} lg={6}>
              <Slide direction="up" in timeout={1000}>
                <Card>
                  <CardContent sx={{ p: 4 }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                      <Box display="flex" alignItems="center">
                        <Avatar
                          sx={{
                            bgcolor: "warning.main",
                            mr: 2,
                            width: 48,
                            height: 48,
                          }}
                        >
                          <Newspaper />
                        </Avatar>
                        <Box>
                          <Typography variant="h5" sx={{ fontWeight: 700 }}>
                            Market News
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Latest market updates and headlines
                          </Typography>
                        </Box>
                      </Box>
                      <Tooltip title="Refresh News">
                        <IconButton 
                          onClick={fetchNews} 
                          disabled={newsLoading}
                          sx={{
                            bgcolor: "rgba(59, 130, 246, 0.1)",
                            "&:hover": {
                              bgcolor: "rgba(59, 130, 246, 0.2)",
                            },
                          }}
                        >
                          <Refresh />
                        </IconButton>
                      </Tooltip>
                    </Box>

                    {newsLoading && (
                      <Box sx={{ mb: 3 }}>
                        <LinearProgress 
                          sx={{ 
                            borderRadius: 2,
                            height: 6,
                            bgcolor: "rgba(245, 158, 11, 0.1)",
                            "& .MuiLinearProgress-bar": {
                              bgcolor: "warning.main",
                              borderRadius: 2,
                            },
                          }} 
                        />
                      </Box>
                    )}

                    <Box sx={{ maxHeight: 400, overflow: "auto" }}>
                      {news.length > 0 ? (
                        <Stack spacing={2}>
                          {news.slice(0, 10).map((n, i) => (
                            <Box
                              key={i}
                              component="a"
                              href={n.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{
                                display: "block",
                                p: 2.5,
                                borderRadius: 2,
                                bgcolor: "rgba(59, 130, 246, 0.05)",
                                border: "1px solid rgba(59, 130, 246, 0.1)",
                                textDecoration: "none",
                                color: "text.primary",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                "&:hover": {
                                  bgcolor: "rgba(59, 130, 246, 0.1)",
                                  transform: "translateX(8px)",
                                  borderColor: "rgba(59, 130, 246, 0.3)",
                                },
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{ 
                                  lineHeight: 1.6,
                                  fontSize: "0.875rem",
                                  fontWeight: 500,
                                }}
                              >
                                {n.title}
                              </Typography>
                            </Box>
                          ))}
                        </Stack>
                      ) : (
                        <Alert severity="info" sx={{ borderRadius: 2 }}>
                          <Typography variant="body2">
                            No news available at the moment. Try refreshing to load latest updates.
                          </Typography>
                        </Alert>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Slide>
            </Grid>

            {/* Enhanced Portfolio News */}
            <Grid item xs={12} lg={6}>
              <Slide direction="up" in timeout={1200}>
                <Card>
                  <CardContent sx={{ p: 4 }}>
                    <Box display="flex" alignItems="center" mb={3}>
                      <Badge 
                        badgeContent={filtered.length} 
                        color="secondary"
                        sx={{
                          "& .MuiBadge-badge": {
                            bgcolor: "secondary.main",
                            color: "white",
                            fontWeight: 600,
                          },
                        }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: "secondary.main",
                            mr: 2,
                            width: 48,
                            height: 48,
                          }}
                        >
                          <Search />
                        </Avatar>
                      </Badge>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                          Portfolio News
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          News specifically related to your holdings
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ maxHeight: 400, overflow: "auto" }}>
                      {filtered.length > 0 ? (
                        <Stack spacing={2}>
                          {filtered.map((title, i) => (
                            <Box
                              key={i}
                              sx={{
                                p: 2.5,
                                borderRadius: 2,
                                bgcolor: "rgba(139, 92, 246, 0.05)",
                                border: "1px solid rgba(139, 92, 246, 0.1)",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                position: "relative",
                                "&:hover": {
                                  bgcolor: "rgba(139, 92, 246, 0.1)",
                                  transform: "translateX(8px)",
                                  borderColor: "rgba(139, 92, 246, 0.3)",
                                },
                                "&::before": {
                                  content: '""',
                                  position: "absolute",
                                  left: 0,
                                  top: 0,
                                  bottom: 0,
                                  width: "3px",
                                  bgcolor: "secondary.main",
                                  borderRadius: "0 3px 3px 0",
                                },
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{ 
                                  lineHeight: 1.6,
                                  fontSize: "0.875rem",
                                  fontWeight: 500,
                                  pl: 2,
                                }}
                              >
                                {title}
                              </Typography>
                            </Box>
                          ))}
                        </Stack>
                      ) : (
                        <Alert 
                          severity="info" 
                          sx={{ 
                            borderRadius: 2,
                            bgcolor: "rgba(59, 130, 246, 0.05)",
                            border: "1px solid rgba(59, 130, 246, 0.2)",
                          }}
                        >
                          <Typography variant="body2">
                            {portfolio.length === 0
                              ? "Add stocks to your portfolio to see relevant news and insights."
                              : "No portfolio-specific news found. Check back later for updates."}
                          </Typography>
                        </Alert>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Slide>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}