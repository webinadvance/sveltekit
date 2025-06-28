# CMS Database Schema for Cinzia Brugnola Portfolio

## Overview
The database is structured as a full CMS (Content Management System) where everything is stored in the database and organized by pages and components.

- **Database Location**: `/var/data/databases/cinziabrugnola.db`
- **Database Type**: SQLite with foreign key constraints enabled

## Core Tables

### 1. `pages` - Website Pages/Routes
```sql
- id (PRIMARY KEY)
- slug (UNIQUE) - URL path like '/', '/about', '/contact'
- title - Page title
- meta_description - SEO meta description
- meta_keywords - SEO keywords
- og_image - Open Graph image URL
- template - Page template type (default: 'default')
- is_published - Boolean flag
- publish_date - When to publish
- created_at, updated_at - Timestamps
```

### 2. `page_sections` - Components on Each Page
```sql
- id (PRIMARY KEY)
- page_id (FOREIGN KEY → pages)
- component_type - 'hero', 'gallery', 'biography', etc.
- title, subtitle - Section headings
- content (JSON) - Flexible component data
- settings (JSON) - Component-specific settings
- display_order - Sort order
- is_active - Boolean flag
- created_at, updated_at - Timestamps
```

### 3. `media_library` - All Media Assets
```sql
- id (PRIMARY KEY)
- filename - Original filename
- url - Public URL
- thumbnail_url - Thumbnail version
- alt_text - Accessibility text
- caption - Image caption
- mime_type - File type
- file_size, width, height - Media properties
- duration - For videos
- folder - Organization folder
- tags (JSON) - Searchable tags
- created_at - Upload timestamp
```

## Gallery System Tables

### 4. `gallery_components` - Gallery Configuration
```sql
- id (PRIMARY KEY)
- section_id (UNIQUE, FOREIGN KEY → page_sections)
- gallery_type - 'grid', 'masonry', 'carousel', 'categories'
- columns - Number of columns
- aspect_ratio - Image aspect ratio
- show_captions - Boolean
- enable_lightbox - Boolean
```

### 5. `gallery_categories` - Gallery Category Organization
```sql
- id (PRIMARY KEY)
- gallery_component_id (FOREIGN KEY → gallery_components)
- slug - URL-friendly identifier
- name - Display name
- icon - Icon identifier
- display_order - Sort order
```

### 6. `gallery_items` - Gallery Images
```sql
- id (PRIMARY KEY)
- gallery_component_id (FOREIGN KEY → gallery_components)
- category_id (FOREIGN KEY → gallery_categories)
- media_id (FOREIGN KEY → media_library)
- title, description - Item details
- link_url - Optional link
- display_order - Sort order
- is_featured - Boolean flag
```

## Productions/Shows Tables

### 7. `shows` - Theater/Cinema/TV Productions
```sql
- id (PRIMARY KEY)
- title, subtitle - Show names
- director - Director name
- venue - Performance venue
- description - Show description
- genre - Show genre
- start_date, end_date - Performance dates
- poster_image_id (FOREIGN KEY → media_library)
- is_current - Currently running
- display_order - Sort order
- metadata (JSON) - Additional data
- created_at - Timestamp
```

### 8. `show_credits` - Cast & Crew
```sql
- id (PRIMARY KEY)
- show_id (FOREIGN KEY → shows)
- person_name - Person's name
- role - Their role
- is_cast - Cast (true) or crew (false)
- display_order - Sort order
```

## Content & Configuration Tables

### 9. `content_blocks` - Reusable Content
```sql
- id (PRIMARY KEY)
- block_key (UNIQUE) - Identifier
- block_type - 'text', 'html', 'markdown', 'json'
- content - The actual content
- metadata (JSON) - Additional data
- created_at, updated_at - Timestamps
```

### 10. `settings` - Site Configuration
```sql
- key (PRIMARY KEY) - Setting name
- value - Setting value
- type - 'string', 'number', 'boolean', 'json'
- category - Setting category
- description - What this setting does
- updated_at - Last update
```

### 11. `form_submissions` - Contact Form Data
```sql
- id (PRIMARY KEY)
- form_type - Type of form (default: 'contact')
- form_data (JSON) - Submitted data
- ip_address - Submitter IP
- user_agent - Browser info
- is_read - Has been read
- is_spam - Marked as spam
- created_at - Submission time
```

## Data Flow

1. **Page Request** → Look up page by slug
2. **Load Sections** → Get all active sections for that page
3. **Component Data** → Each section type has its own data structure
4. **Media Assets** → All images/videos referenced from media_library
5. **Dynamic Content** → Shows, galleries, etc. load from their tables

## Current Status

- ✅ Database schema created
- ✅ Build process working
- ✅ SSR integration ready
- ⏳ Currently using static data from `/src/lib/data/portfolio.js`
- ⏳ Database migration tool needed to move static data to DB

## Next Steps

To fully utilize the database:
1. Create admin interface for content management
2. Build migration script to import existing static data
3. Update page components to load from database
4. Implement caching layer for performance