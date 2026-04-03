import { STATIC_POSTS, CATEGORIES } from './data';
import { supabase } from './supabase';

const API_BASE = "http://localhost:3001/api";

// Fallback logic to get local data (+ any stored locally)
function getLocalPosts(query = "") {
  let data = [...STATIC_POSTS];
  
  // Mix in localStorage additions for assignment testing logic
  try {
    const local = JSON.parse(localStorage.getItem('user_posts')) || [];
    data = [...local, ...data];
  } catch(e) {}

  if (query.includes('category=')) {
    const cat = new URLSearchParams(query).get('category');
    data = data.filter(p => p.category === cat);
  }
  if (query.includes('featured')) {
    data = data.filter(p => p.featured);
  }
  return data;
}

export async function fetchPosts(query = "") {
  // 1. Try Supabase
  if (supabase) {
    try {
      let req = supabase.from('posts').select('*');
      if (query.includes('category=')) req = req.eq('category', new URLSearchParams(query).get('category'));
      if (query.includes('featured')) req = req.eq('featured', true);
      
      const { data, error } = await req.order('id', { ascending: false });
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn("Supabase fetch failed", e);
    }
  }

  // 2. Try Local API Server
  try {
    const res = await fetch(`${API_BASE}/posts${query}`);
    if (res.ok) return await res.json();
  } catch (err) {
    // 3. Fallback to static + local storage
    return getLocalPosts(query);
  }
  
  return getLocalPosts(query);
}

export async function fetchPostBySlug(slug) {
  if (supabase) {
    const { data } = await supabase.from('posts').select('*').eq('slug', slug).single();
    if (data) return data;
  }
  
  try {
    const res = await fetch(`${API_BASE}/posts/${slug}`);
    if (res.ok) return await res.json();
  } catch (err) {
    return getLocalPosts().find(p => p.slug === slug);
  }
  return getLocalPosts().find(p => p.slug === slug);
}

export async function fetchCategories() {
  return CATEGORIES;
}

export async function submitPost(postData) {
  if (supabase) {
    const { data, error } = await supabase.from('posts').insert([postData]);
    if (!error) return true;
  }
  // Fallback: save to localStorage for the demo assignment
  try {
    const existing = JSON.parse(localStorage.getItem('user_posts')) || [];
    const newPost = {
      ...postData,
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
    localStorage.setItem('user_posts', JSON.stringify([newPost, ...existing]));
    return true;
  } catch(e) {
    return false;
  }
}

export async function fetchReviews() {
  if (supabase) {
    const { data, error } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
    if (!error && data && data.length > 0) return data;
  }
  try {
    return JSON.parse(localStorage.getItem('user_reviews')) || [];
  } catch(e) { return []; }
}

export async function submitReview(reviewData) {
  if (supabase) {
    const { error } = await supabase.from('reviews').insert([reviewData]);
    if (!error) return true;
  }
  try {
    const existing = JSON.parse(localStorage.getItem('user_reviews')) || [];
    localStorage.setItem('user_reviews', JSON.stringify([{ ...reviewData, id: Date.now() }, ...existing]));
    return true;
  } catch(e) {
    return false;
  }
}
