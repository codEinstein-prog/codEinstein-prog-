// Admin Dashboard with Blog, Social Media Auth, and API/Services Management
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

const sanityProjectId = '<your-project-id>';
const sanityDataset = 'production';
const sanityToken = '<your-sanity-write-token>';

const sanityQuery = `*[_type == "post"] | order(_createdAt desc) {
  _id,
  title,
  body,
  publishedAt
}`;

async function fetchBlogPosts() {
  const res = await fetch(`https://${sanityProjectId}.api.sanity.io/v2021-06-07/data/query/${sanityDataset}?query=${encodeURIComponent(sanityQuery)}`);
  const result = await res.json();
  return result.result;
}

async function createOrUpdatePost(post) {
  const res = await fetch(`https://${sanityProjectId}.api.sanity.io/v2021-06-07/data/mutate/${sanityDataset}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sanityToken}`,
    },
    body: JSON.stringify({
      mutations: [
        {
          createOrReplace: {
            _type: 'post',
            _id: post._id || `post-${Date.now()}`,
            title: post.title,
            body: post.body,
            publishedAt: new Date().toISOString(),
          },
        },
      ],
    }),
  });
  return res.json();
}

export default function AdminDashboard() {
  const [auth, setAuth] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [section, setSection] = useState('dashboard');
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState({ title: '', body: '', _id: null });
  const [authKeys, setAuthKeys] = useState({ facebook: '', twitter: '', instagram: '', linkedin: '' });
  const [backendLinks] = useState([
    { label: 'API Source Code', url: 'https://github.com/your-org/your-api' },
    { label: 'Landing Page', url: 'https://yoursite.com' },
    { label: 'Admin Tools', url: 'https://yoursite.com/admin' }
  ]);
  const [usageData, setUsageData] = useState([
    { section: 'Home', users: 120 },
    { section: 'Projects', users: 90 },
    { section: 'Blog', users: 75 },
    { section: 'Contact', users: 50 },
  ]);
  const [emailList, setEmailList] = useState([]);
  const [payServices, setPayServices] = useState([
    { name: 'Premium Blog Access', active: true },
    { name: 'Custom API Integration', active: false },
  ]);

  useEffect(() => {
    if (auth) {
      fetchBlogPosts().then(setPosts);
      fetchEmails();
    }
  }, [auth]);

  const fetchEmails = async () => {
    const response = await fetch('/api/emails');
    const data = await response.json();
    setEmailList(data);
  };

  const handleSubmitPost = async () => {
    await createOrUpdatePost(editPost);
    setEditPost({ title: '', body: '', _id: null });
    fetchBlogPosts().then(setPosts);
  };

  const handleEdit = (post) => setEditPost(post);
  const handleLogin = () => setAuth(true);
  const handleToggleService = (index) => {
    const newServices = [...payServices];
    newServices[index].active = !newServices[index].active;
    setPayServices(newServices);
  };

  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <Card className="w-full max-w-sm">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <Input placeholder="Username" className="mb-2" />
            <Input type="password" placeholder="Password" className="mb-4" />
            <Button className="w-full" onClick={handleLogin}>Sign In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <aside className="w-64 bg-white dark:bg-gray-800 p-4 border-r border-gray-200 dark:border-gray-700 min-h-screen">
        <h2 className="text-xl font-bold mb-6">Admin Menu</h2>
        <ul className="space-y-3">
          <li><Button variant="ghost" className="w-full justify-start" onClick={() => setSection('dashboard')}>Dashboard</Button></li>
          <li><Button variant="ghost" className="w-full justify-start" onClick={() => setSection('social')}>Social Media</Button></li>
          <li><Button variant="ghost" className="w-full justify-start" onClick={() => setSection('backend')}>API & Services</Button></li>
          <li><Button variant="ghost" className="w-full justify-start" onClick={() => setSection('blog')}>Blog Posts</Button></li>
        </ul>
        <div className="mt-10">
          <span>Dark Mode</span>
          <Switch checked={darkMode} onCheckedChange={setDarkMode} className="ml-2" />
        </div>
      </aside>

      <main className="flex-1 p-6">
        {section === 'backend' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">API & Services</h2>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Backend Links</h3>
              {backendLinks.map(link => (
                <p key={link.label} className="mb-1">
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{link.label}</a>
                </p>
              ))}
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">User Activity</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={usageData}>
                  <XAxis dataKey="section" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Pay Services</h3>
              {payServices.map((service, idx) => (
                <div key={service.name} className="flex items-center justify-between mb-2">
                  <span>{service.name}</span>
                  <Switch checked={service.active} onCheckedChange={() => handleToggleService(idx)} />
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Collected Emails</h3>
              <ul className="list-disc pl-5">
                {emailList.map((email, index) => (
                  <li key={index}>{email}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {section === 'blog' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Blog Posts</h2>
            <div className="mb-6">
              <Input placeholder="Title" value={editPost.title} onChange={(e) => setEditPost({ ...editPost, title: e.target.value })} className="mb-2" />
              <textarea
                value={editPost.body}
                onChange={(e) => setEditPost({ ...editPost, body: e.target.value })}
                placeholder="Post content..."
                className="w-full p-2 mb-2 border rounded"
              />
              <Button onClick={handleSubmitPost}>{editPost._id ? 'Update' : 'Publish'} Post</Button>
            </div>
            {posts.map(post => (
              <Card key={post._id} className="mb-4">
                <CardContent className="p-4">
                  <h3 className="text-xl font-semibold mb-1">{post.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
                  <p className="text-base">{post.body}</p>
                  <Button className="mt-2" onClick={() => handleEdit(post)}>Edit</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Add Social and Dashboard sections here if needed */}
      </main>
    </div>
  );
}
