import axios from "axios";
import User from "../Model/User.js";

const cache = new Map();
const CACHE_TTL = 60 * 60 * 1000;

const getCached = (key) => {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) return entry.data;
  cache.delete(key);
  return null;
};

const setCache = (key, data) => {
  cache.set(key, { data, timestamp: Date.now() });
};

export const updateCPProfiles = async (req, res) => {
  try {
    const { leetcode } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cpProfiles = { leetcode: leetcode?.trim() || "" };
    await user.save();
    cache.delete(`lc_${user._id}`);

    res.json({ message: "LeetCode profile updated successfully", cpProfiles: user.cpProfiles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCPStats = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const profiles = user.cpProfiles || {};
    const result = { leetcode: null, profiles };

    if (profiles.leetcode) {
      result.leetcode = await fetchLeetCodeStats(user._id, profiles.leetcode);
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCPStatsForUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const profiles = user.cpProfiles || {};
    const result = { leetcode: null, profiles };

    if (profiles.leetcode) {
      result.leetcode = await fetchLeetCodeStats(user._id, profiles.leetcode);
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function fetchLeetCodeStats(userId, username) {
  const cacheKey = `lc_${userId}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    const { data } = await axios.get(
      `https://leetcode-stats-api.herokuapp.com/${username}`,
      { timeout: 10000 }
    );

    const result = {
      platform: "LeetCode",
      username,
      totalSolved: data.totalSolved || 0,
      easySolved: data.easySolved || 0,
      mediumSolved: data.mediumSolved || 0,
      hardSolved: data.hardSolved || 0,
      totalQuestions: data.totalQuestions || 0,
      totalEasy: data.totalEasy || 0,
      totalMedium: data.totalMedium || 0,
      totalHard: data.totalHard || 0,
      ranking: data.ranking || "N/A",
      acceptanceRate: data.acceptanceRate || 0,
      contributionPoints: data.contributionPoints || 0,
      reputation: data.reputation || 0,
    };

    setCache(cacheKey, result);
    return result;
  } catch (err) {
    return { platform: "LeetCode", username, error: "Failed to fetch stats. Check your username." };
  }
}
