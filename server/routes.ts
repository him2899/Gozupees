import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

// Helper function to create request options with authentication if needed
function createWPRequestOptions(): RequestInit {
  const options: RequestInit = {};
  
  if (process.env.WP_AUTH_USER && process.env.WP_AUTH_PASSWORD) {
    const authString = Buffer.from(`${process.env.WP_AUTH_USER}:${process.env.WP_AUTH_PASSWORD}`).toString('base64');
    options.headers = {
      'Authorization': `Basic ${authString}`,
      'Content-Type': 'application/json'
    };
  }
  
  return options;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // WordPress API Proxy Routes
  // These routes proxy requests to the WordPress REST API

  // Posts endpoint
  app.get('/api/wordpress/posts', async (req, res) => {
    try {
      const { page = 1, per_page = 9, categories } = req.query;
      
      if (process.env.NODE_ENV === 'development' && (!process.env.WP_API_URL || process.env.USE_MOCK_DATA === 'true')) {
        // Return mock data in development environment
        const mockPosts = [
          {
            id: 1,
            date: '2023-05-15T10:00:00',
            slug: 'leveraging-ai-for-marketing-insights',
            title: {
              rendered: 'Leveraging AI for Marketing Insights'
            },
            excerpt: {
              rendered: '<p>Discover how enterprise marketing teams are using artificial intelligence to generate deeper customer insights and optimize campaign performance.</p>'
            },
            content: {
              rendered: '<p>This is a mock article content for development purposes.</p>'
            },
            featured_media: 1,
            categories: [1, 3],
            tags: [1, 5],
            _embedded: {
              'wp:featuredmedia': [{
                source_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop&auto=format',
                alt_text: 'AI visualization'
              }],
              'wp:term': [
                [{ id: 1, name: 'AI & Machine Learning', slug: 'ai-machine-learning' }],
                [{ id: 1, name: 'Marketing Technology', slug: 'marketing-technology' }]
              ],
              author: [{
                id: 1,
                name: 'Sarah Johnson',
                avatar_urls: {
                  96: 'https://secure.gravatar.com/avatar/123?s=96&d=mm&r=g'
                }
              }]
            }
          },
          {
            id: 2,
            date: '2023-05-10T09:30:00',
            slug: 'first-party-data-strategies',
            title: {
              rendered: 'First-Party Data Strategies for a Cookieless Future'
            },
            excerpt: {
              rendered: '<p>Learn how forward-thinking companies are preparing for the end of third-party cookies with robust first-party data collection and activation strategies.</p>'
            },
            content: {
              rendered: '<p>This is a mock article content for development purposes.</p>'
            },
            featured_media: 2,
            categories: [2, 4],
            tags: [3, 4],
            _embedded: {
              'wp:featuredmedia': [{
                source_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&auto=format',
                alt_text: 'Data visualization'
              }],
              'wp:term': [
                [{ id: 2, name: 'Data Privacy', slug: 'data-privacy' }],
                [{ id: 4, name: 'Analytics', slug: 'analytics' }]
              ],
              author: [{
                id: 2,
                name: 'Michael Chen',
                avatar_urls: {
                  96: 'https://secure.gravatar.com/avatar/456?s=96&d=mm&r=g'
                }
              }]
            }
          },
          {
            id: 3,
            date: '2023-05-05T14:45:00',
            slug: 'multi-touch-attribution-models',
            title: {
              rendered: 'Advanced Multi-Touch Attribution Models'
            },
            excerpt: {
              rendered: '<p>Explore sophisticated attribution models that go beyond last-click to provide accurate insights into your marketing channel effectiveness.</p>'
            },
            content: {
              rendered: '<p>This is a mock article content for development purposes.</p>'
            },
            featured_media: 3,
            categories: [3, 5],
            tags: [2, 6],
            _embedded: {
              'wp:featuredmedia': [{
                source_url: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&h=400&fit=crop&auto=format',
                alt_text: 'Attribution model diagram'
              }],
              'wp:term': [
                [{ id: 3, name: 'Attribution', slug: 'attribution' }],
                [{ id: 5, name: 'Marketing Analytics', slug: 'marketing-analytics' }]
              ],
              author: [{
                id: 3,
                name: 'Alex Turner',
                avatar_urls: {
                  96: 'https://secure.gravatar.com/avatar/789?s=96&d=mm&r=g'
                }
              }]
            }
          },
          {
            id: 4,
            date: '2023-04-28T11:20:00',
            slug: 'predictive-analytics-for-customer-journeys',
            title: {
              rendered: 'Predictive Analytics for Customer Journeys'
            },
            excerpt: {
              rendered: '<p>Learn how predictive models can anticipate customer needs and behaviors, enabling proactive marketing and personalized experiences.</p>'
            },
            content: {
              rendered: '<p>This is a mock article content for development purposes.</p>'
            },
            featured_media: 4,
            categories: [1, 5],
            tags: [1, 7],
            _embedded: {
              'wp:featuredmedia': [{
                source_url: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=400&fit=crop&auto=format',
                alt_text: 'Predictive customer journey'
              }],
              'wp:term': [
                [{ id: 1, name: 'AI & Machine Learning', slug: 'ai-machine-learning' }],
                [{ id: 5, name: 'Marketing Analytics', slug: 'marketing-analytics' }]
              ],
              author: [{
                id: 4,
                name: 'Emily Watson',
                avatar_urls: {
                  96: 'https://secure.gravatar.com/avatar/012?s=96&d=mm&r=g'
                }
              }]
            }
          }
        ];

        // Calculate start and end for pagination
        const startIndex = (Number(page) - 1) * Number(per_page);
        const endIndex = startIndex + Number(per_page);
        
        // Filter by category if specified
        let filteredPosts = mockPosts;
        if (categories) {
          const categoryIds = Array.isArray(categories) 
            ? categories.map(Number) 
            : [Number(categories)];
          
          filteredPosts = mockPosts.filter(post => 
            post.categories.some(cat => categoryIds.includes(cat))
          );
        }
        
        // Return paginated result
        const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
        return res.json(paginatedPosts);
      }
      
      // Real API call for production
      let url = `${process.env.WP_API_URL || 'https://aimarketingjournal.com/wp-json/wp/v2'}/posts?_embed=true&page=${page}&per_page=${per_page}`;
      
      if (categories) {
        url += `&categories=${categories}`;
      }
      
      // Use authentication if credentials are provided
      const options = createWPRequestOptions();
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`WordPress API error: ${response.status}`);
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      // Provide mock data on error in development
      if (process.env.NODE_ENV === 'development') {
        const mockPosts = [
          {
            id: 1,
            date: '2023-05-15T10:00:00',
            slug: 'leveraging-ai-for-marketing-insights',
            title: {
              rendered: 'Leveraging AI for Marketing Insights'
            },
            excerpt: {
              rendered: '<p>Discover how enterprise marketing teams are using artificial intelligence to generate deeper customer insights and optimize campaign performance.</p>'
            },
            content: {
              rendered: '<p>This is a mock article content for development purposes.</p>'
            },
            featured_media: 1,
            categories: [1, 3],
            tags: [1, 5],
            _embedded: {
              'wp:featuredmedia': [{
                source_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop&auto=format',
                alt_text: 'AI visualization'
              }],
              'wp:term': [
                [{ id: 1, name: 'AI & Machine Learning', slug: 'ai-machine-learning' }],
                [{ id: 1, name: 'Marketing Technology', slug: 'marketing-technology' }]
              ],
              author: [{
                id: 1,
                name: 'Sarah Johnson',
                avatar_urls: {
                  96: 'https://secure.gravatar.com/avatar/123?s=96&d=mm&r=g'
                }
              }]
            }
          },
          {
            id: 2,
            date: '2023-05-10T09:30:00',
            slug: 'first-party-data-strategies',
            title: {
              rendered: 'First-Party Data Strategies for a Cookieless Future'
            },
            excerpt: {
              rendered: '<p>Learn how forward-thinking companies are preparing for the end of third-party cookies with robust first-party data collection and activation strategies.</p>'
            },
            content: {
              rendered: '<p>This is a mock article content for development purposes.</p>'
            },
            featured_media: 2,
            categories: [2, 4],
            tags: [3, 4],
            _embedded: {
              'wp:featuredmedia': [{
                source_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&auto=format',
                alt_text: 'Data visualization'
              }],
              'wp:term': [
                [{ id: 2, name: 'Data Privacy', slug: 'data-privacy' }],
                [{ id: 4, name: 'Analytics', slug: 'analytics' }]
              ],
              author: [{
                id: 2,
                name: 'Michael Chen',
                avatar_urls: {
                  96: 'https://secure.gravatar.com/avatar/456?s=96&d=mm&r=g'
                }
              }]
            }
          }
        ];
        return res.json(mockPosts);
      }
      res.status(500).json({ error: 'Failed to fetch posts from WordPress' });
    }
  });

  // Single post by slug
  app.get('/api/wordpress/posts/:slug', async (req, res) => {
    try {
      const { slug } = req.params;
      const url = `${process.env.WP_API_URL || 'https://aimarketingjournal.com/wp-json/wp/v2'}/posts?slug=${slug}&_embed=true`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`WordPress API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.length === 0) {
        return res.status(404).json({ error: 'Post not found' });
      }
      
      res.json(data[0]);
    } catch (error) {
      console.error(`Error fetching post with slug ${req.params.slug}:`, error);
      res.status(500).json({ error: 'Failed to fetch post from WordPress' });
    }
  });

  // Categories endpoint now handled by Next.js API route at pages/api/wordpress/categories.ts

  // Tags endpoint now handled by Next.js API route at pages/api/wordpress/tags.ts

  // Custom endpoints for resources (white papers, case studies, research)
  app.get('/api/wordpress/resources', async (req, res) => {
    try {
      const { featured } = req.query;
      
      if (process.env.NODE_ENV === 'development' && (!process.env.WP_API_URL || process.env.USE_MOCK_DATA === 'true')) {
        // Mock resources for development
        const mockResources = [
          {
            id: 1,
            slug: 'future-of-first-party-data',
            title: 'The Future of First-Party Data in the Cookieless Era',
            description: 'Strategies for building robust first-party data assets as third-party cookies phase out.',
            type: 'WHITE_PAPER',
            icon: '<i class="fas fa-file-pdf"></i>',
            details: '24 pages • Published May 2023',
            url: '/white-papers/future-of-first-party-data'
          },
          {
            id: 2,
            slug: 'ai-in-marketing-analytics',
            title: 'The Future of AI in Marketing Analytics',
            description: 'Discover how AI is transforming data analytics for enterprise marketing teams.',
            type: 'WHITE_PAPER',
            icon: '<i class="fas fa-file-pdf"></i>',
            details: '32 pages • Published April 2023',
            url: '/white-papers/ai-in-marketing-analytics'
          },
          {
            id: 3,
            slug: 'insurance-company-case-study',
            title: 'How Global Insurance Inc. Increased Conversion by 43%',
            description: 'Learn how this Fortune 500 insurance provider transformed their digital marketing through data integration.',
            type: 'CASE_STUDY',
            icon: '<i class="fas fa-chart-line"></i>',
            details: 'Insurance • Enterprise',
            url: '/case-studies/insurance-company-case-study'
          },
          {
            id: 4,
            slug: 'marketing-attribution-models',
            title: 'Complete Guide to Marketing Attribution Models',
            description: 'A comprehensive examination of different attribution models and when to use them.',
            type: 'RESEARCH',
            icon: '<i class="fas fa-microscope"></i>',
            details: '42 pages • Published June 2023',
            url: '/research/marketing-attribution-models'
          }
        ];
        
        // Filter by featured if specified
        let result = mockResources;
        if (featured === 'true') {
          // Just return the first 2 items as "featured"
          result = mockResources.slice(0, 2);
        }
        
        return res.json(result);
      }
      
      // Real API call for production
      let url = `${process.env.WP_API_URL || 'https://aimarketingjournal.com/wp-json/wp/v2'}/resources?_embed=true`;
      
      if (featured === 'true') {
        url += '&featured=1';
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`WordPress API error: ${response.status}`);
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching resources:', error);
      
      // Provide mock data on error in development
      if (process.env.NODE_ENV === 'development') {
        const mockResources = [
          {
            id: 1,
            slug: 'future-of-first-party-data',
            title: 'The Future of First-Party Data in the Cookieless Era',
            description: 'Strategies for building robust first-party data assets as third-party cookies phase out.',
            type: 'WHITE_PAPER',
            icon: '<i class="fas fa-file-pdf"></i>',
            details: '24 pages • Published May 2023',
            url: '/white-papers/future-of-first-party-data'
          },
          {
            id: 2,
            slug: 'ai-in-marketing-analytics',
            title: 'The Future of AI in Marketing Analytics',
            description: 'Discover how AI is transforming data analytics for enterprise marketing teams.',
            type: 'WHITE_PAPER',
            icon: '<i class="fas fa-file-pdf"></i>',
            details: '32 pages • Published April 2023',
            url: '/white-papers/ai-in-marketing-analytics'
          }
        ];
        return res.json(mockResources);
      }
      
      res.status(500).json({ error: 'Failed to fetch resources from WordPress' });
    }
  });

  // Custom endpoint for webinars
  app.get('/api/wordpress/webinars', async (req, res) => {
    try {
      const { per_page = 10 } = req.query;
      
      if (process.env.NODE_ENV === 'development' && (!process.env.WP_API_URL || process.env.USE_MOCK_DATA === 'true')) {
        // Mock webinars for development
        const mockWebinars = [
          {
            id: 1,
            slug: 'mastering-multi-touch-attribution',
            title: 'Mastering Multi-Touch Attribution Models in a Cross-Channel World',
            description: 'Learn how to properly attribute conversions across multiple marketing touchpoints to optimize your marketing spend.',
            date: 'June 15, 2023',
            time: '11:00 AM PT',
            image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
            status: 'LIVE',
            duration: '60 min',
            speakers: [
              {
                name: 'Sarah Johnson',
                title: 'Google',
                avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=60&h=60'
              },
              {
                name: 'David Martinez',
                title: 'Adobe',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=60&h=60'
              }
            ],
            registrationUrl: '/webinars/mastering-multi-touch-attribution/register'
          },
          {
            id: 2,
            slug: 'automating-customer-journey',
            title: 'Automating Customer Journey Orchestration with AI',
            description: 'Discover how AI is revolutionizing the way marketers design, implement, and optimize customer journeys at scale.',
            date: 'May 20, 2023',
            time: '10:00 AM PT',
            image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
            status: 'ON-DEMAND',
            duration: '45 min',
            speakers: [
              {
                name: 'Michael Chen',
                title: 'Chief Data Scientist',
                avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=60&h=60'
              }
            ],
            registrationUrl: '/webinars/automating-customer-journey/watch'
          },
          {
            id: 3,
            slug: 'privacy-first-marketing',
            title: 'Privacy-First Marketing: Strategies for the Cookieless Future',
            description: 'Learn how to adapt your marketing technology and data collection strategies for a world without third-party cookies.',
            date: 'July 12, 2023',
            time: '9:00 AM PT',
            image: 'https://images.unsplash.com/photo-1535191042502-e6a9a3d407e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
            status: 'LIVE',
            duration: '60 min',
            speakers: [
              {
                name: 'Emily Watson',
                title: 'Privacy Officer',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=60&h=60'
              }
            ],
            registrationUrl: '/webinars/privacy-first-marketing/register'
          }
        ];
        
        // Apply per_page parameter
        const result = mockWebinars.slice(0, Number(per_page));
        return res.json(result);
      }
      
      // Real API call for production
      const url = `${process.env.WP_API_URL || 'https://aimarketingjournal.com/wp-json/wp/v2'}/webinars?_embed=true&per_page=${per_page}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`WordPress API error: ${response.status}`);
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching webinars:', error);
      
      // Provide mock data on error in development
      if (process.env.NODE_ENV === 'development') {
        const mockWebinars = [
          {
            id: 1,
            slug: 'mastering-multi-touch-attribution',
            title: 'Mastering Multi-Touch Attribution Models in a Cross-Channel World',
            description: 'Learn how to properly attribute conversions across multiple marketing touchpoints to optimize your marketing spend.',
            date: 'June 15, 2023',
            time: '11:00 AM PT',
            image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
            status: 'LIVE',
            duration: '60 min',
            speakers: [
              {
                name: 'Sarah Johnson',
                title: 'Google',
                avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=60&h=60'
              }
            ],
            registrationUrl: '/webinars/mastering-multi-touch-attribution/register'
          },
          {
            id: 2,
            slug: 'automating-customer-journey',
            title: 'Automating Customer Journey Orchestration with AI',
            description: 'Discover how AI is revolutionizing the way marketers design, implement, and optimize customer journeys at scale.',
            date: 'May 20, 2023',
            time: '10:00 AM PT',
            image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
            status: 'ON-DEMAND',
            duration: '45 min',
            speakers: [
              {
                name: 'Michael Chen',
                title: 'Chief Data Scientist',
                avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=60&h=60'
              }
            ],
            registrationUrl: '/webinars/automating-customer-journey/watch'
          }
        ];
        return res.json(mockWebinars);
      }
      
      res.status(500).json({ error: 'Failed to fetch webinars from WordPress' });
    }
  });

  // Media endpoint
  app.get('/api/wordpress/media/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const url = `${process.env.WP_API_URL || 'https://aimarketingjournal.com/wp-json/wp/v2'}/media/${id}`;
      
      const response = await fetch(url);
      
      if (response.status === 404) {
        return res.status(404).json({ error: 'Media not found' });
      }
      
      if (!response.ok) {
        throw new Error(`WordPress API error: ${response.status}`);
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error(`Error fetching media with id ${req.params.id}:`, error);
      res.status(500).json({ error: 'Failed to fetch media from WordPress' });
    }
  });

  // Newsletter signup endpoint
  app.post('/api/newsletter/subscribe', async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }
      
      // This would typically connect to your newsletter service API
      // such as Mailchimp, ConvertKit, etc.
      
      // Simulate a successful subscription
      res.json({ success: true, message: 'Successfully subscribed to newsletter' });
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      res.status(500).json({ error: 'Failed to subscribe to newsletter' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
