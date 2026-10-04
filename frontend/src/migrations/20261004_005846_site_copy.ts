import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_home_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_about_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__about_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_blog_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__blog_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_contact_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__contact_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_terms_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__terms_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_site_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"greeting" varchar DEFAULT 'Lovely to see you.',
  	"heading" varchar DEFAULT 'I’m Krista, a freelance content and copywriter.',
  	"intro" jsonb DEFAULT '{"root":{"format":"","indent":0,"version":1,"direction":"ltr","type":"root","children":[{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"Give me a tricky topic, a complicated problem and a strong coffee, and I’m happy.","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"I turn ideas, thoughts and data into content strategies, campaigns and words that give people a reason to pay attention.","format":0,"detail":0,"mode":"normal","style":"","version":1}]}]}}'::jsonb,
  	"about_button" varchar DEFAULT 'About me',
  	"contact_link" varchar DEFAULT 'Let’s talk',
  	"latest_label" varchar DEFAULT 'Latest entry',
  	"meta_title" varchar DEFAULT 'Home',
  	"meta_description" varchar DEFAULT 'Explore the world of a professional freelance content and copywriter. Get in touch to transform your next writing or marketing project.',
  	"_status" "enum_home_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_home_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_greeting" varchar DEFAULT 'Lovely to see you.',
  	"version_heading" varchar DEFAULT 'I’m Krista, a freelance content and copywriter.',
  	"version_intro" jsonb DEFAULT '{"root":{"format":"","indent":0,"version":1,"direction":"ltr","type":"root","children":[{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"Give me a tricky topic, a complicated problem and a strong coffee, and I’m happy.","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"I turn ideas, thoughts and data into content strategies, campaigns and words that give people a reason to pay attention.","format":0,"detail":0,"mode":"normal","style":"","version":1}]}]}}'::jsonb,
  	"version_about_button" varchar DEFAULT 'About me',
  	"version_contact_link" varchar DEFAULT 'Let’s talk',
  	"version_latest_label" varchar DEFAULT 'Latest entry',
  	"version_meta_title" varchar DEFAULT 'Home',
  	"version_meta_description" varchar DEFAULT 'Explore the world of a professional freelance content and copywriter. Get in touch to transform your next writing or marketing project.',
  	"version__status" "enum__home_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "about_glance_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "about" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'About',
  	"greeting" varchar DEFAULT 'Hi.',
  	"body" jsonb DEFAULT '{"root":{"format":"","indent":0,"version":1,"direction":"ltr","type":"root","children":[{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"I’m happy to see you find your way to my little website.","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"I’m Krista, a copywriter based in the vibrant city of London. For years now, I’ve been freelancing as a content writer, fueled by copious amounts of coffee and an unending love for words.","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"Through my professional writing, I’ve worked with fantastic companies, from multinationals to smaller startups and solo entrepreneurs. My work has allowed me to explore a diverse range of topics, from finance and HR to travel and personal development. I’ve written blogs, newsletters, white papers, emails and social media content — all sorts of materials to support business growth.","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"What drives me most is my curiosity — I love exploring new projects and ideas and supporting remarkable people and teams in achieving their goals. I’ve connected with wonderful people and am excited about the new experiences I’ve yet to discover.","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"Thank you for visiting my website and spending a few of your precious moments with me. I hope you enjoy what you find and come visit again.","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"Until next time,","format":0,"detail":0,"mode":"normal","style":"","version":1}]}]}}'::jsonb,
  	"signature" varchar DEFAULT 'Krista',
  	"postscript_text" varchar DEFAULT 'Psst. Check out',
  	"postscript_link" varchar DEFAULT 'my contact details',
  	"glance_title" varchar DEFAULT 'Krista,
  at a glance',
  	"meta_title" varchar DEFAULT 'About',
  	"meta_description" varchar DEFAULT 'A professional content and copywriter from London, with experience in finance, Human Resources, taxation, investing, personal development and travel.',
  	"_status" "enum_about_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_about_v_version_glance_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_heading" varchar DEFAULT 'About',
  	"version_greeting" varchar DEFAULT 'Hi.',
  	"version_body" jsonb DEFAULT '{"root":{"format":"","indent":0,"version":1,"direction":"ltr","type":"root","children":[{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"I’m happy to see you find your way to my little website.","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"I’m Krista, a copywriter based in the vibrant city of London. For years now, I’ve been freelancing as a content writer, fueled by copious amounts of coffee and an unending love for words.","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"Through my professional writing, I’ve worked with fantastic companies, from multinationals to smaller startups and solo entrepreneurs. My work has allowed me to explore a diverse range of topics, from finance and HR to travel and personal development. I’ve written blogs, newsletters, white papers, emails and social media content — all sorts of materials to support business growth.","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"What drives me most is my curiosity — I love exploring new projects and ideas and supporting remarkable people and teams in achieving their goals. I’ve connected with wonderful people and am excited about the new experiences I’ve yet to discover.","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"Thank you for visiting my website and spending a few of your precious moments with me. I hope you enjoy what you find and come visit again.","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"Until next time,","format":0,"detail":0,"mode":"normal","style":"","version":1}]}]}}'::jsonb,
  	"version_signature" varchar DEFAULT 'Krista',
  	"version_postscript_text" varchar DEFAULT 'Psst. Check out',
  	"version_postscript_link" varchar DEFAULT 'my contact details',
  	"version_glance_title" varchar DEFAULT 'Krista,
  at a glance',
  	"version_meta_title" varchar DEFAULT 'About',
  	"version_meta_description" varchar DEFAULT 'A professional content and copywriter from London, with experience in finance, Human Resources, taxation, investing, personal development and travel.',
  	"version__status" "enum__about_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "blog" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Blog Posts',
  	"intro" varchar DEFAULT 'A collection of things I’ve been thinking about, reading about or accidentally disappearing down a rabbit hole about. You’ll mostly find musings around creativity, words, work, and being human.',
  	"empty" varchar DEFAULT 'No posts found',
  	"coffee_title" varchar DEFAULT 'Pour yourself a coffee',
  	"coffee_empty" varchar DEFAULT 'Your cup is empty. Pour one before you settle in.',
  	"coffee_part_full" varchar DEFAULT 'There’s some left from your last read. Top it up?',
  	"coffee_full" varchar DEFAULT 'A full cup, still hot. Pick a post and settle in.',
  	"coffee_pouring" varchar DEFAULT 'Pouring…',
  	"coffee_pour" varchar DEFAULT 'Pour a cup',
  	"coffee_top_up" varchar DEFAULT 'Top up',
  	"coffee_full_button" varchar DEFAULT 'Your cup is full',
  	"post_end_title" varchar DEFAULT 'That’s the bottom of the cup',
  	"post_end_text" varchar DEFAULT 'Head back to the blog for a refill and another read.',
  	"post_end_back" varchar DEFAULT 'Back to the blog',
  	"post_end_share" varchar DEFAULT 'Share',
  	"meta_title" varchar DEFAULT 'Blog Posts',
  	"meta_description" varchar DEFAULT 'Thoughts on words, creativity and the everyday moments that inspire my writing.',
  	"_status" "enum_blog_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_blog_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_heading" varchar DEFAULT 'Blog Posts',
  	"version_intro" varchar DEFAULT 'A collection of things I’ve been thinking about, reading about or accidentally disappearing down a rabbit hole about. You’ll mostly find musings around creativity, words, work, and being human.',
  	"version_empty" varchar DEFAULT 'No posts found',
  	"version_coffee_title" varchar DEFAULT 'Pour yourself a coffee',
  	"version_coffee_empty" varchar DEFAULT 'Your cup is empty. Pour one before you settle in.',
  	"version_coffee_part_full" varchar DEFAULT 'There’s some left from your last read. Top it up?',
  	"version_coffee_full" varchar DEFAULT 'A full cup, still hot. Pick a post and settle in.',
  	"version_coffee_pouring" varchar DEFAULT 'Pouring…',
  	"version_coffee_pour" varchar DEFAULT 'Pour a cup',
  	"version_coffee_top_up" varchar DEFAULT 'Top up',
  	"version_coffee_full_button" varchar DEFAULT 'Your cup is full',
  	"version_post_end_title" varchar DEFAULT 'That’s the bottom of the cup',
  	"version_post_end_text" varchar DEFAULT 'Head back to the blog for a refill and another read.',
  	"version_post_end_back" varchar DEFAULT 'Back to the blog',
  	"version_post_end_share" varchar DEFAULT 'Share',
  	"version_meta_title" varchar DEFAULT 'Blog Posts',
  	"version_meta_description" varchar DEFAULT 'Thoughts on words, creativity and the everyday moments that inspire my writing.',
  	"version__status" "enum__blog_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "contact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Would I like to get in touch?',
  	"intro" jsonb DEFAULT '{"root":{"format":"","indent":0,"version":1,"direction":"ltr","type":"root","children":[{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"Thank you for asking and yes — I’m always ready for new connections and would love to hear from you!","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"Whether you’re looking for a content writer for your business, want to collaborate on a project or just have a great (book) suggestion to share, leave me a message right here:","format":0,"detail":0,"mode":"normal","style":"","version":1}]}]}}'::jsonb,
  	"closing" varchar DEFAULT 'I hope to hear from you!',
  	"form_name" varchar DEFAULT 'Name',
  	"form_email" varchar DEFAULT 'Email',
  	"form_message" varchar DEFAULT 'Message',
  	"form_send" varchar DEFAULT 'Send message',
  	"form_sending" varchar DEFAULT 'Sending…',
  	"form_sent" varchar DEFAULT 'Thank you! Your message is on its way and I’ll get back to you soon.',
  	"form_failed" varchar DEFAULT 'Sorry, your message couldn’t be sent. Please try again later',
  	"form_rate_limited" varchar DEFAULT 'You’ve sent a few messages already. Please try again later',
  	"form_email_fallback" varchar DEFAULT 'or email me at',
  	"note_title" varchar DEFAULT 'Other ways to get in touch',
  	"note_linkedin_link" varchar DEFAULT 'Find me on LinkedIn',
  	"note_linkedin_url" varchar DEFAULT 'https://www.linkedin.com/in/kristalomu',
  	"note_linkedin_text" varchar DEFAULT 'Connect, have a nose around and say hello.',
  	"note_email_heading" varchar DEFAULT 'Email me directly',
  	"note_email_text" varchar DEFAULT 'Not a form person? You can email me at',
  	"note_footer" varchar DEFAULT 'I’m always up for a chat about interesting projects, content puzzles, and, of course, good book recommendations.',
  	"meta_title" varchar DEFAULT 'Contact',
  	"meta_description" varchar DEFAULT 'Need a content writer for business or personal projects? Contact a professional copywriter to get results with your blog, newsletters, emails and social media.',
  	"_status" "enum_contact_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_contact_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_heading" varchar DEFAULT 'Would I like to get in touch?',
  	"version_intro" jsonb DEFAULT '{"root":{"format":"","indent":0,"version":1,"direction":"ltr","type":"root","children":[{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"Thank you for asking and yes — I’m always ready for new connections and would love to hear from you!","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"Whether you’re looking for a content writer for your business, want to collaborate on a project or just have a great (book) suggestion to share, leave me a message right here:","format":0,"detail":0,"mode":"normal","style":"","version":1}]}]}}'::jsonb,
  	"version_closing" varchar DEFAULT 'I hope to hear from you!',
  	"version_form_name" varchar DEFAULT 'Name',
  	"version_form_email" varchar DEFAULT 'Email',
  	"version_form_message" varchar DEFAULT 'Message',
  	"version_form_send" varchar DEFAULT 'Send message',
  	"version_form_sending" varchar DEFAULT 'Sending…',
  	"version_form_sent" varchar DEFAULT 'Thank you! Your message is on its way and I’ll get back to you soon.',
  	"version_form_failed" varchar DEFAULT 'Sorry, your message couldn’t be sent. Please try again later',
  	"version_form_rate_limited" varchar DEFAULT 'You’ve sent a few messages already. Please try again later',
  	"version_form_email_fallback" varchar DEFAULT 'or email me at',
  	"version_note_title" varchar DEFAULT 'Other ways to get in touch',
  	"version_note_linkedin_link" varchar DEFAULT 'Find me on LinkedIn',
  	"version_note_linkedin_url" varchar DEFAULT 'https://www.linkedin.com/in/kristalomu',
  	"version_note_linkedin_text" varchar DEFAULT 'Connect, have a nose around and say hello.',
  	"version_note_email_heading" varchar DEFAULT 'Email me directly',
  	"version_note_email_text" varchar DEFAULT 'Not a form person? You can email me at',
  	"version_note_footer" varchar DEFAULT 'I’m always up for a chat about interesting projects, content puzzles, and, of course, good book recommendations.',
  	"version_meta_title" varchar DEFAULT 'Contact',
  	"version_meta_description" varchar DEFAULT 'Need a content writer for business or personal projects? Contact a professional copywriter to get results with your blog, newsletters, emails and social media.',
  	"version__status" "enum__contact_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "terms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Website Terms of Use',
  	"last_updated" varchar DEFAULT 'September, 2024',
  	"body" jsonb DEFAULT '{"root":{"format":"","indent":0,"version":1,"direction":"ltr","type":"root","children":[{"format":"","indent":0,"version":1,"direction":"ltr","type":"heading","tag":"h2","children":[{"type":"text","text":"Terms of Use","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"Please read these Terms of Use carefully before using this website. Using this website indicates your agreement with these Terms of Use. If you do not agree with any of the below Terms of Use, do not use this website. Krista Lomu reserves the right, at its sole discretion, to modify, alter or otherwise update these Terms of Use at any time, and you agree to be bound by such modifications, alterations or updates.","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"heading","tag":"h2","children":[{"type":"text","text":"Information on this website","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"Whilst every effort is made to update the information contained on this website, neither Krista Lomu nor any third party or data or content provider make any representations or warranties, whether express, implied in law or residual, as to the sequence, accuracy, completeness or reliability of information, opinions, research information, data and/or content contained on the website (including but not limited to any information which may be provided by any third party or data or content providers) (“information”) and shall not be bound in any manner by any information contained on the website.","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"Krista Lomu reserves the right at any time to change or discontinue any aspect or feature of this website without notice. No information shall be construed as advice, and information is offered for information purposes only and is not intended for trading purposes. You and your company rely on the information contained on this website at your own risk.","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"heading","tag":"h2","children":[{"type":"text","text":"Trademarks, Copyrights and Restrictions","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"The Krista Lomu website is controlled and operated by Krista Lomu. All material on this Site, including, but not limited to text, photos, and graphics, is protected by copyrights, which are owned and controlled by Krista Lomu or by other parties that have granted permission to use their material on the Krista Lomu website (“Copyrights”).","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"Material from the Krista Lomu website may not be copied, reproduced, republished, downloaded, posted, transmitted, or distributed in any way. Modification of the materials or use of the materials for any other purpose is a violation of the copyrights and other proprietary rights. For purposes of this Terms Of Use Agreement, using any such material on any other website or networked computer environment is prohibited.","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"heading","tag":"h2","children":[{"type":"text","text":"Links to External Websites","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"Krista Lomu, whether or not affiliated with sites which may be linked to this Site, is not responsible for their content (“Linked Sites”). The linked sites are for your convenience only, and you access them at your own risk. Appearance of linked sites does not constitute endorsement of the linked Site’s website or information, products or services.","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"heading","tag":"h2","children":[{"type":"text","text":"Links to This Website","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"Krista Lomu encourages other businesses or individuals to link their sites to this Site. You do not have to obtain permission to do so, although we would be grateful if you could contact Krista Lomu so we can keep any such links up to date. If you wish to establish a link to this website or any particular page of this website, it is requested that the link does not open within another website.","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"heading","tag":"h2","children":[{"type":"text","text":"Website User Activity","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"As a user of the Site, you agree to use the Site legally, not to use the Site for illegal purposes and not to:","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"list","listType":"bullet","start":1,"tag":"ul","children":[{"format":"","indent":0,"version":1,"direction":"ltr","type":"listitem","value":1,"children":[{"type":"text","text":"Harass or mistreat other users of the Site or Krista Lomu;","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"listitem","value":2,"children":[{"type":"text","text":"Violate the intellectual property rights of the Site owner(s) or any third party to the Site;","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"listitem","value":3,"children":[{"type":"text","text":"Act in any way that could be considered fraudulent or","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"listitem","value":4,"children":[{"type":"text","text":"Post any material that may be deemed inappropriate or offensive.","format":0,"detail":0,"mode":"normal","style":"","version":1}]}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"If we believe you are using the Site illegally or in a manner that violates these Terms of Use, we reserve the right to limit, suspend, or terminate your access to the Site and take any legal steps necessary to prevent you from accessing the Site.","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"heading","tag":"h2","children":[{"type":"text","text":"Web Analytics Tools","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"The Site may use web analytics tools to collect information on when users access the Site and how long they remain on the page. This information is stored securely and will not be connected to your personal information as a user of the Site.","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"heading","tag":"h2","children":[{"type":"text","text":"Personal Information","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"If you use the website email or contact Krista Lomu via social media, your personal information may be collected and stored securely. This information will be password-protected and governed by the privacy rules and regulations of the third-party platforms you use to contact. Please contact Krista Lomu if you want to see what information is stored and to ask for the data to be destroyed.","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"heading","tag":"h2","children":[{"type":"text","text":"Website Security","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"We do not guarantee that the Site will be secure or free from bugs or viruses. You are responsible for configuring your information technology, computer programs, and platform to access the Site.","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"heading","tag":"h2","children":[{"type":"text","text":"Disclaimer","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"Krista Lomu nor its affiliated or related entities or its content providers are responsible or liable to any person or entity whatsoever (including, without limitation, persons who may use or rely on such data/materials or to whom such data/materials may be furnished) for any loss, damage (whether actual, consequential, punitive or otherwise), injury, claim, liability or other cause of any kind or character whatsoever based upon or resulting from any information or opinions provided in the Krista Lomu website.","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"heading","tag":"h2","children":[{"type":"text","text":"Applicable Law","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"Please note that these Terms of Use, their subject matter and their formation are governed by English law.","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"heading","tag":"h2","children":[{"type":"text","text":"Contact Details","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"If you have any questions, comments, or concerns about the website, these Terms of Use, any other relevant policies or notices, or the way Krista Lomu is handling your personal information, please email kristalomu@gmail.com.","format":0,"detail":0,"mode":"normal","style":"","version":1}]}]}}'::jsonb,
  	"meta_title" varchar DEFAULT 'Terms of Use',
  	"meta_description" varchar,
  	"_status" "enum_terms_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_terms_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_heading" varchar DEFAULT 'Website Terms of Use',
  	"version_last_updated" varchar DEFAULT 'September, 2024',
  	"version_body" jsonb DEFAULT '{"root":{"format":"","indent":0,"version":1,"direction":"ltr","type":"root","children":[{"format":"","indent":0,"version":1,"direction":"ltr","type":"heading","tag":"h2","children":[{"type":"text","text":"Terms of Use","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"Please read these Terms of Use carefully before using this website. Using this website indicates your agreement with these Terms of Use. If you do not agree with any of the below Terms of Use, do not use this website. Krista Lomu reserves the right, at its sole discretion, to modify, alter or otherwise update these Terms of Use at any time, and you agree to be bound by such modifications, alterations or updates.","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"heading","tag":"h2","children":[{"type":"text","text":"Information on this website","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"Whilst every effort is made to update the information contained on this website, neither Krista Lomu nor any third party or data or content provider make any representations or warranties, whether express, implied in law or residual, as to the sequence, accuracy, completeness or reliability of information, opinions, research information, data and/or content contained on the website (including but not limited to any information which may be provided by any third party or data or content providers) (“information”) and shall not be bound in any manner by any information contained on the website.","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"Krista Lomu reserves the right at any time to change or discontinue any aspect or feature of this website without notice. No information shall be construed as advice, and information is offered for information purposes only and is not intended for trading purposes. You and your company rely on the information contained on this website at your own risk.","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"heading","tag":"h2","children":[{"type":"text","text":"Trademarks, Copyrights and Restrictions","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"The Krista Lomu website is controlled and operated by Krista Lomu. All material on this Site, including, but not limited to text, photos, and graphics, is protected by copyrights, which are owned and controlled by Krista Lomu or by other parties that have granted permission to use their material on the Krista Lomu website (“Copyrights”).","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"Material from the Krista Lomu website may not be copied, reproduced, republished, downloaded, posted, transmitted, or distributed in any way. Modification of the materials or use of the materials for any other purpose is a violation of the copyrights and other proprietary rights. For purposes of this Terms Of Use Agreement, using any such material on any other website or networked computer environment is prohibited.","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"heading","tag":"h2","children":[{"type":"text","text":"Links to External Websites","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"Krista Lomu, whether or not affiliated with sites which may be linked to this Site, is not responsible for their content (“Linked Sites”). The linked sites are for your convenience only, and you access them at your own risk. Appearance of linked sites does not constitute endorsement of the linked Site’s website or information, products or services.","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"heading","tag":"h2","children":[{"type":"text","text":"Links to This Website","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"Krista Lomu encourages other businesses or individuals to link their sites to this Site. You do not have to obtain permission to do so, although we would be grateful if you could contact Krista Lomu so we can keep any such links up to date. If you wish to establish a link to this website or any particular page of this website, it is requested that the link does not open within another website.","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"heading","tag":"h2","children":[{"type":"text","text":"Website User Activity","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"As a user of the Site, you agree to use the Site legally, not to use the Site for illegal purposes and not to:","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"list","listType":"bullet","start":1,"tag":"ul","children":[{"format":"","indent":0,"version":1,"direction":"ltr","type":"listitem","value":1,"children":[{"type":"text","text":"Harass or mistreat other users of the Site or Krista Lomu;","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"listitem","value":2,"children":[{"type":"text","text":"Violate the intellectual property rights of the Site owner(s) or any third party to the Site;","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"listitem","value":3,"children":[{"type":"text","text":"Act in any way that could be considered fraudulent or","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"listitem","value":4,"children":[{"type":"text","text":"Post any material that may be deemed inappropriate or offensive.","format":0,"detail":0,"mode":"normal","style":"","version":1}]}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"If we believe you are using the Site illegally or in a manner that violates these Terms of Use, we reserve the right to limit, suspend, or terminate your access to the Site and take any legal steps necessary to prevent you from accessing the Site.","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"heading","tag":"h2","children":[{"type":"text","text":"Web Analytics Tools","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"The Site may use web analytics tools to collect information on when users access the Site and how long they remain on the page. This information is stored securely and will not be connected to your personal information as a user of the Site.","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"heading","tag":"h2","children":[{"type":"text","text":"Personal Information","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"If you use the website email or contact Krista Lomu via social media, your personal information may be collected and stored securely. This information will be password-protected and governed by the privacy rules and regulations of the third-party platforms you use to contact. Please contact Krista Lomu if you want to see what information is stored and to ask for the data to be destroyed.","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"heading","tag":"h2","children":[{"type":"text","text":"Website Security","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"We do not guarantee that the Site will be secure or free from bugs or viruses. You are responsible for configuring your information technology, computer programs, and platform to access the Site.","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"heading","tag":"h2","children":[{"type":"text","text":"Disclaimer","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"Krista Lomu nor its affiliated or related entities or its content providers are responsible or liable to any person or entity whatsoever (including, without limitation, persons who may use or rely on such data/materials or to whom such data/materials may be furnished) for any loss, damage (whether actual, consequential, punitive or otherwise), injury, claim, liability or other cause of any kind or character whatsoever based upon or resulting from any information or opinions provided in the Krista Lomu website.","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"heading","tag":"h2","children":[{"type":"text","text":"Applicable Law","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"Please note that these Terms of Use, their subject matter and their formation are governed by English law.","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"heading","tag":"h2","children":[{"type":"text","text":"Contact Details","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"If you have any questions, comments, or concerns about the website, these Terms of Use, any other relevant policies or notices, or the way Krista Lomu is handling your personal information, please email kristalomu@gmail.com.","format":0,"detail":0,"mode":"normal","style":"","version":1}]}]}}'::jsonb,
  	"version_meta_title" varchar DEFAULT 'Terms of Use',
  	"version_meta_description" varchar,
  	"version__status" "enum__terms_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "site" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT 'Krista Lomu',
  	"nav_home" varchar DEFAULT 'Home',
  	"nav_about" varchar DEFAULT 'About',
  	"nav_blog" varchar DEFAULT 'Blog',
  	"nav_contact" varchar DEFAULT 'Contact',
  	"footer_terms" varchar DEFAULT 'Terms of Use',
  	"not_found_heading" varchar DEFAULT 'You did it!',
  	"not_found_subheading" varchar DEFAULT 'You found the 404 page.',
  	"not_found_body" jsonb DEFAULT '{"root":{"format":"","indent":0,"version":1,"direction":"ltr","type":"root","children":[{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"If this wasn’t intentional, please return to the ","format":0,"detail":0,"mode":"normal","style":"","version":1},{"format":"","indent":0,"version":3,"direction":"ltr","type":"link","fields":{"linkType":"custom","url":"/","newTab":false},"children":[{"type":"text","text":"home page","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"type":"text","text":" and try again.","format":0,"detail":0,"mode":"normal","style":"","version":1}]}]}}'::jsonb,
  	"_status" "enum_site_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_site_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_name" varchar DEFAULT 'Krista Lomu',
  	"version_nav_home" varchar DEFAULT 'Home',
  	"version_nav_about" varchar DEFAULT 'About',
  	"version_nav_blog" varchar DEFAULT 'Blog',
  	"version_nav_contact" varchar DEFAULT 'Contact',
  	"version_footer_terms" varchar DEFAULT 'Terms of Use',
  	"version_not_found_heading" varchar DEFAULT 'You did it!',
  	"version_not_found_subheading" varchar DEFAULT 'You found the 404 page.',
  	"version_not_found_body" jsonb DEFAULT '{"root":{"format":"","indent":0,"version":1,"direction":"ltr","type":"root","children":[{"format":"","indent":0,"version":1,"direction":"ltr","type":"paragraph","textFormat":0,"textStyle":"","children":[{"type":"text","text":"If this wasn’t intentional, please return to the ","format":0,"detail":0,"mode":"normal","style":"","version":1},{"format":"","indent":0,"version":3,"direction":"ltr","type":"link","fields":{"linkType":"custom","url":"/","newTab":false},"children":[{"type":"text","text":"home page","format":0,"detail":0,"mode":"normal","style":"","version":1}]},{"type":"text","text":" and try again.","format":0,"detail":0,"mode":"normal","style":"","version":1}]}]}}'::jsonb,
  	"version__status" "enum__site_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "about_glance_facts" ADD CONSTRAINT "about_glance_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_v_version_glance_facts" ADD CONSTRAINT "_about_v_version_glance_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home__status_idx" ON "home" USING btree ("_status");
  CREATE INDEX "_home_v_version_version__status_idx" ON "_home_v" USING btree ("version__status");
  CREATE INDEX "_home_v_created_at_idx" ON "_home_v" USING btree ("created_at");
  CREATE INDEX "_home_v_updated_at_idx" ON "_home_v" USING btree ("updated_at");
  CREATE INDEX "_home_v_latest_idx" ON "_home_v" USING btree ("latest");
  CREATE INDEX "_home_v_autosave_idx" ON "_home_v" USING btree ("autosave");
  CREATE INDEX "about_glance_facts_order_idx" ON "about_glance_facts" USING btree ("_order");
  CREATE INDEX "about_glance_facts_parent_id_idx" ON "about_glance_facts" USING btree ("_parent_id");
  CREATE INDEX "about__status_idx" ON "about" USING btree ("_status");
  CREATE INDEX "_about_v_version_glance_facts_order_idx" ON "_about_v_version_glance_facts" USING btree ("_order");
  CREATE INDEX "_about_v_version_glance_facts_parent_id_idx" ON "_about_v_version_glance_facts" USING btree ("_parent_id");
  CREATE INDEX "_about_v_version_version__status_idx" ON "_about_v" USING btree ("version__status");
  CREATE INDEX "_about_v_created_at_idx" ON "_about_v" USING btree ("created_at");
  CREATE INDEX "_about_v_updated_at_idx" ON "_about_v" USING btree ("updated_at");
  CREATE INDEX "_about_v_latest_idx" ON "_about_v" USING btree ("latest");
  CREATE INDEX "_about_v_autosave_idx" ON "_about_v" USING btree ("autosave");
  CREATE INDEX "blog__status_idx" ON "blog" USING btree ("_status");
  CREATE INDEX "_blog_v_version_version__status_idx" ON "_blog_v" USING btree ("version__status");
  CREATE INDEX "_blog_v_created_at_idx" ON "_blog_v" USING btree ("created_at");
  CREATE INDEX "_blog_v_updated_at_idx" ON "_blog_v" USING btree ("updated_at");
  CREATE INDEX "_blog_v_latest_idx" ON "_blog_v" USING btree ("latest");
  CREATE INDEX "_blog_v_autosave_idx" ON "_blog_v" USING btree ("autosave");
  CREATE INDEX "contact__status_idx" ON "contact" USING btree ("_status");
  CREATE INDEX "_contact_v_version_version__status_idx" ON "_contact_v" USING btree ("version__status");
  CREATE INDEX "_contact_v_created_at_idx" ON "_contact_v" USING btree ("created_at");
  CREATE INDEX "_contact_v_updated_at_idx" ON "_contact_v" USING btree ("updated_at");
  CREATE INDEX "_contact_v_latest_idx" ON "_contact_v" USING btree ("latest");
  CREATE INDEX "_contact_v_autosave_idx" ON "_contact_v" USING btree ("autosave");
  CREATE INDEX "terms__status_idx" ON "terms" USING btree ("_status");
  CREATE INDEX "_terms_v_version_version__status_idx" ON "_terms_v" USING btree ("version__status");
  CREATE INDEX "_terms_v_created_at_idx" ON "_terms_v" USING btree ("created_at");
  CREATE INDEX "_terms_v_updated_at_idx" ON "_terms_v" USING btree ("updated_at");
  CREATE INDEX "_terms_v_latest_idx" ON "_terms_v" USING btree ("latest");
  CREATE INDEX "_terms_v_autosave_idx" ON "_terms_v" USING btree ("autosave");
  CREATE INDEX "site__status_idx" ON "site" USING btree ("_status");
  CREATE INDEX "_site_v_version_version__status_idx" ON "_site_v" USING btree ("version__status");
  CREATE INDEX "_site_v_created_at_idx" ON "_site_v" USING btree ("created_at");
  CREATE INDEX "_site_v_updated_at_idx" ON "_site_v" USING btree ("updated_at");
  CREATE INDEX "_site_v_latest_idx" ON "_site_v" USING btree ("latest");
  CREATE INDEX "_site_v_autosave_idx" ON "_site_v" USING btree ("autosave");`)

  // Publish each global with its defaults, the site's existing wording, so
  // the admin shows them as Published rather than as unsaved drafts. An
  // unsaved global already reads as its defaults, so the site doesn't change.
  for (const slug of ['home', 'about', 'blog', 'contact', 'terms', 'site'] as const) {
    const { id: _id, ...defaults } = await payload.findGlobal({
      slug,
      depth: 0,
      req,
    })
    await payload.updateGlobal({
      slug,
      data: { ...defaults, _status: 'published' },
      depth: 0,
      req,
    })
  }
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "home" CASCADE;
  DROP TABLE "_home_v" CASCADE;
  DROP TABLE "about_glance_facts" CASCADE;
  DROP TABLE "about" CASCADE;
  DROP TABLE "_about_v_version_glance_facts" CASCADE;
  DROP TABLE "_about_v" CASCADE;
  DROP TABLE "blog" CASCADE;
  DROP TABLE "_blog_v" CASCADE;
  DROP TABLE "contact" CASCADE;
  DROP TABLE "_contact_v" CASCADE;
  DROP TABLE "terms" CASCADE;
  DROP TABLE "_terms_v" CASCADE;
  DROP TABLE "site" CASCADE;
  DROP TABLE "_site_v" CASCADE;
  DROP TYPE "public"."enum_home_status";
  DROP TYPE "public"."enum__home_v_version_status";
  DROP TYPE "public"."enum_about_status";
  DROP TYPE "public"."enum__about_v_version_status";
  DROP TYPE "public"."enum_blog_status";
  DROP TYPE "public"."enum__blog_v_version_status";
  DROP TYPE "public"."enum_contact_status";
  DROP TYPE "public"."enum__contact_v_version_status";
  DROP TYPE "public"."enum_terms_status";
  DROP TYPE "public"."enum__terms_v_version_status";
  DROP TYPE "public"."enum_site_status";
  DROP TYPE "public"."enum__site_v_version_status";`)
}
