#!/usr/bin/env python3
"""
TFA Email Sequence Generator
Produces HTML email templates with consistent design for Texas Ford Aquatics.
Design: alternating dark navy / white panels, red accents, photo dividers.
"""

import html
import re

# Brand colors
NAVY = "#020b27"
WHITE = "#ffffff"
RED = "#be2533"
DEEP_BLUE = "#072057"
LIGHT_GRAY = "#cccccc"

def bullet_arrow(text, color):
    """Return HTML for a red-arrow bullet item."""
    text_color = WHITE if color == NAVY else NAVY
    return f'''<tr><td style="padding:0 0 8px 0;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:26px;color:{text_color};">
    <span style="color:{RED};margin-right:6px;">&#9654;</span> {text}</td></tr>'''

def section_heading(title, bg):
    """Section heading with red left border."""
    text_color = WHITE if bg == NAVY else NAVY
    return f'''<tr><td style="padding:0 0 16px 0;">
    <h2 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:bold;color:{text_color};border-left:4px solid {RED};padding-left:14px;line-height:30px;">{title}</h2>
    </td></tr>'''

def paragraph(text, bg):
    """Standard paragraph."""
    text_color = WHITE if bg == NAVY else NAVY
    return f'''<tr><td style="padding:0 0 16px 0;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:26px;color:{text_color};">{text}</td></tr>'''

def italic_paragraph(text, bg):
    """Italic paragraph for opening questions."""
    text_color = WHITE if bg == NAVY else NAVY
    return f'''<tr><td style="padding:0 0 16px 0;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:26px;color:{text_color};font-style:italic;">{text}</td></tr>'''

def bullets_block(items, bg):
    """Block of red-arrow bullet items."""
    rows = "\n".join(bullet_arrow(item, bg) for item in items)
    return f'''<tr><td style="padding:0 0 16px 0;"><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">{rows}</table></td></tr>'''

def photo_divider(img):
    """Full-width photo row (600x300)."""
    return f'''<!-- Photo Divider -->
<tr><td style="padding:0;line-height:0;font-size:0;">
<img src="{img}" width="600" height="300" alt="" style="display:block;width:100%;height:auto;border:0;" />
</td></tr>'''

def panel_start(bg, padding="40px 35px 30px 35px"):
    """Start a content panel."""
    return f'''<!-- Panel -->
<tr><td bgcolor="{bg}" style="padding:{padding};">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">'''

def panel_end():
    return '''</table>
</td></tr>'''

def callout_box(text):
    """One Simple Takeaway callout box — dark navy bg, red left border, inside a white panel."""
    return f'''<!-- Callout Box -->
<tr><td bgcolor="{WHITE}" style="padding:30px 35px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
<tr><td bgcolor="{NAVY}" style="padding:24px 28px;border-left:5px solid {RED};border-radius:6px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
<tr><td style="padding:0 0 10px 0;">
<h2 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:bold;color:{RED};line-height:28px;">One Simple Takeaway</h2>
</td></tr>
<tr><td style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:26px;color:{WHITE};font-style:italic;">
{text}
</td></tr>
</table>
</td></tr>
</table>
</td></tr>'''

def cta_button(url="https://txfordaquatics.com", label="Visit Texas Ford Aquatics"):
    """Red CTA button."""
    return f'''<tr><td style="padding:10px 0 0 0;" align="center">
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
<tr><td bgcolor="{RED}" style="border-radius:15px;padding:14px 36px;">
<a href="{url}" style="font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:bold;color:{WHITE};text-decoration:none;display:inline-block;">{label}</a>
</td></tr>
</table>
</td></tr>'''

def build_email(title, subject, hero_img, divider_imgs, panels_content, takeaway_text, closing_text):
    """
    Build a complete email HTML.

    panels_content: list of dicts with keys:
        bg: NAVY or WHITE
        sections: list of section dicts with keys:
            type: 'heading', 'paragraph', 'italic', 'bullets'
            content: str or list
    divider_imgs: list of 4 image filenames (placed between panels)
    """

    # Assemble panel HTML
    all_rows = []

    # ── Header bar ──
    all_rows.append(f'''<!-- Header -->
<tr><td bgcolor="{NAVY}" style="padding:18px 30px;" align="center">
<a href="https://txfordaquatics.com" style="text-decoration:none;">
<img src="TFA EXCELLENCE LOGO@4x.png" width="220" height="auto" alt="Texas Ford Aquatics Excellence" style="display:block;border:0;max-width:220px;" />
</a>
</td></tr>''')

    # ── Hero image ──
    all_rows.append(photo_divider(hero_img))

    # ── Intro panel (always dark navy) ──
    intro = panels_content[0]
    all_rows.append(panel_start(NAVY))
    # Title with red rule
    all_rows.append(f'''<tr><td style="padding:0 0 6px 0;">
<h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:28px;font-weight:bold;color:{WHITE};line-height:36px;">{title}</h1>
</td></tr>
<tr><td style="padding:0 0 20px 0;">
<div style="width:60px;height:3px;background-color:{RED};"></div>
</td></tr>''')
    # Intro content
    for sec in intro['sections']:
        if sec['type'] == 'italic':
            all_rows.append(italic_paragraph(sec['content'], NAVY))
        elif sec['type'] == 'paragraph':
            all_rows.append(paragraph(sec['content'], NAVY))
        elif sec['type'] == 'bullets':
            all_rows.append(bullets_block(sec['content'], NAVY))
    all_rows.append(panel_end())

    # ── Remaining content panels interleaved with photos ──
    divider_idx = 0
    for i, panel in enumerate(panels_content[1:], 1):
        # Photo divider before this panel
        if divider_idx < len(divider_imgs):
            all_rows.append(photo_divider(divider_imgs[divider_idx]))
            divider_idx += 1

        bg = panel['bg']
        all_rows.append(panel_start(bg))
        for sec in panel['sections']:
            if sec['type'] == 'heading':
                all_rows.append(section_heading(sec['content'], bg))
            elif sec['type'] == 'paragraph':
                all_rows.append(paragraph(sec['content'], bg))
            elif sec['type'] == 'italic':
                all_rows.append(italic_paragraph(sec['content'], bg))
            elif sec['type'] == 'bullets':
                all_rows.append(bullets_block(sec['content'], bg))
        all_rows.append(panel_end())

    # ── Callout box (white panel wrapper) ──
    all_rows.append(callout_box(takeaway_text))

    # ── Closing panel + CTA ──
    all_rows.append(panel_start(NAVY, "30px 35px 40px 35px"))
    all_rows.append(paragraph(closing_text, NAVY))
    all_rows.append(cta_button())
    all_rows.append(panel_end())

    # ── Partner logos bar ──
    all_rows.append(f'''<!-- Partner Logos -->
<tr><td bgcolor="{WHITE}" style="padding:25px 20px;" align="center">
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
<tr>
<td style="padding:0 12px;" align="center" valign="middle"><img src="USA_swimming.png" width="80" height="auto" alt="USA Swimming" style="display:block;border:0;" /></td>
<td style="padding:0 12px;" align="center" valign="middle"><img src="Level_for.png" width="80" height="auto" alt="Level For" style="display:block;border:0;" /></td>
<td style="padding:0 12px;" align="center" valign="middle"><img src="Downsyndrome.png" width="80" height="auto" alt="Down Syndrome" style="display:block;border:0;" /></td>
<td style="padding:0 12px;" align="center" valign="middle"><img src="ntsilogowhitesm_094083tthumb.png" width="80" height="auto" alt="NTSI" style="display:block;border:0;" /></td>
</tr>
</table>
</td></tr>''')

    # ── Footer ──
    all_rows.append(f'''<!-- Footer -->
<tr><td bgcolor="{DEEP_BLUE}" style="padding:30px 35px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
<tr><td align="center" style="padding:0 0 18px 0;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
<tr>
<td style="padding:0 8px;"><a href="https://txfordaquatics.com" style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:{WHITE};text-decoration:underline;">Website</a></td>
<td style="padding:0 8px;"><a href="https://txfordaquatics.com/calendar" style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:{WHITE};text-decoration:underline;">Calendar</a></td>
<td style="padding:0 8px;"><a href="https://txfordaquatics.com/contact" style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:{WHITE};text-decoration:underline;">Contact</a></td>
</tr>
</table>
</td></tr>
<tr><td align="center" style="padding:0 0 18px 0;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
<tr>
<td style="padding:0 6px;"><a href="https://facebook.com/txfordaquatics"><img src="https://tlr7mjg0q.stripocdn.email/content/assets/img/social-icons/circle-white/facebook-circle-white.png" width="28" height="28" alt="Facebook" style="display:block;border:0;" /></a></td>
<td style="padding:0 6px;"><a href="https://twitter.com/txfordaquatics"><img src="https://tlr7mjg0q.stripocdn.email/content/assets/img/social-icons/circle-white/x-circle-white.png" width="28" height="28" alt="X" style="display:block;border:0;" /></a></td>
<td style="padding:0 6px;"><a href="https://instagram.com/txfordaquatics"><img src="https://tlr7mjg0q.stripocdn.email/content/assets/img/social-icons/circle-white/instagram-circle-white.png" width="28" height="28" alt="Instagram" style="display:block;border:0;" /></a></td>
<td style="padding:0 6px;"><a href="https://youtube.com/@txfordaquatics"><img src="https://tlr7mjg0q.stripocdn.email/content/assets/img/social-icons/circle-white/youtube-circle-white.png" width="28" height="28" alt="YouTube" style="display:block;border:0;" /></a></td>
</tr>
</table>
</td></tr>
<tr><td align="center" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:{LIGHT_GRAY};line-height:18px;">
Texas Ford Aquatics &bull; North Texas<br/>
<a href="#" style="color:{LIGHT_GRAY};text-decoration:underline;">Unsubscribe</a> &bull; <a href="#" style="color:{LIGHT_GRAY};text-decoration:underline;">Manage Preferences</a>
</td></tr>
</table>
</td></tr>''')

    body_rows = "\n".join(all_rows)

    return f'''<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>{subject}</title>
<!--[if mso]>
<style type="text/css">
body, table, td {{font-family: Arial, Helvetica, sans-serif !important;}}
</style>
<![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
<center>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#f4f4f4;">
<tr><td align="center" style="padding:20px 0;">

<!-- Email Container -->
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px;max-width:600px;background-color:{NAVY};">
{body_rows}
</table>
<!-- /Email Container -->

</td></tr>
</table>
</center>
</body>
</html>'''


# ═══════════════════════════════════════════════════════
# EMAIL DEFINITIONS
# ═══════════════════════════════════════════════════════

emails = []

# ── EMAIL 02 ──
emails.append({
    'filename': '02 - What It Means to Be Part of Texas Ford Aquatics.html',
    'subject': 'What It Means to Be Part of Texas Ford Aquatics',
    'title': 'What It Means to Be Part of Texas Ford Aquatics',
    'hero': 'email-group.jpg',
    'dividers': ['photo-wall-team.jpg', 'email-team.jpg', 'photo-duo.jpg', 'photo-team2.jpg'],
    'panels': [
        # Intro (DN)
        {'bg': NAVY, 'sections': [
            {'type': 'italic', 'content': '"What kind of environment is my swimmer stepping into?"'},
            {'type': 'paragraph', 'content': 'At Texas Ford Aquatics, we care deeply about performance. But we care just as much about the kind of teammate and person each swimmer becomes.'},
            {'type': 'paragraph', 'content': 'Swimming is an individual sport inside a team structure. That combination is powerful — and it requires clarity about expectations from the beginning.'},
        ]},
        # W: More Than Just Showing Up + Effort and Coachability
        {'bg': WHITE, 'sections': [
            {'type': 'heading', 'content': 'More Than Just Showing Up'},
            {'type': 'paragraph', 'content': 'Being part of TFA means more than attending practice. It means contributing to a positive training environment where every swimmer can improve.'},
            {'type': 'paragraph', 'content': 'The tone of a workout is shaped not just by the coaches, but by the athletes themselves. Swimmers who encourage teammates, stay focused during sets, and bring consistent effort help elevate the entire group. We rise together.'},
            {'type': 'heading', 'content': 'Effort and Coachability'},
            {'type': 'paragraph', 'content': 'Talent is helpful. Work ethic is essential. TFA athletes are expected to:'},
            {'type': 'bullets', 'content': [
                'Bring effort and focus to every practice',
                'Listen to coaching instruction',
                'Apply feedback without resistance',
                'Stay engaged even during challenging sets',
            ]},
            {'type': 'paragraph', 'content': 'Improvement in swimming comes from repetition and refinement. Swimmers who embrace correction and stay coachable improve more consistently over time. Parents can reinforce this by praising effort, focus, and attitude — not just race results.'},
        ]},
        # DN: Respect Matters + Building Something Bigger
        {'bg': NAVY, 'sections': [
            {'type': 'heading', 'content': 'Respect Matters'},
            {'type': 'paragraph', 'content': 'A strong team culture depends on respect. That includes:'},
            {'type': 'bullets', 'content': [
                'Respect for coaches and their instruction',
                'Respect for teammates and competitors',
                'Respect for the facility and equipment',
                'Representing TFA appropriately at meets and in the community',
            ]},
            {'type': 'paragraph', 'content': 'Competitive sports can be demanding. Athletes are held accountable. Clear correction and high standards are part of growth. When swimmers understand that structure and accountability are forms of support — not criticism — they develop resilience and confidence.'},
            {'type': 'heading', 'content': 'Building Something Bigger Than One Swimmer'},
            {'type': 'paragraph', 'content': 'TFA is a family-oriented program. Every swimmer, regardless of level, contributes to the environment. Some athletes are just learning fundamentals. Others are chasing championship or even Olympic-level goals. Each path is respected.'},
            {'type': 'paragraph', 'content': 'What unites them is shared commitment to discipline, persistence, and teamwork. When young athletes learn to encourage others, handle correction maturely, and support team goals, they develop skills that extend far beyond the pool.'},
        ]},
        # W: How Families Can Help
        {'bg': WHITE, 'sections': [
            {'type': 'heading', 'content': 'How Families Can Help'},
            {'type': 'paragraph', 'content': 'Parents play a major role in shaping team culture. You can support your swimmer by:'},
            {'type': 'bullets', 'content': [
                'Reinforcing respectful communication',
                'Encouraging responsibility and accountability',
                'Avoiding negative commentary about teammates or coaching decisions',
                'Modeling composure during meets and competitions',
            ]},
            {'type': 'paragraph', 'content': 'Athletes often mirror the tone set at home. When families and coaches operate with alignment, swimmers feel secure and supported.'},
        ]},
    ],
    'takeaway': 'At Texas Ford Aquatics, success is not measured only by times on a scoreboard. It is measured by effort, coachability, respect, and the ability to contribute positively to a team. Those qualities build faster swimmers — and stronger young people.',
    'closing': 'We are proud of the culture we build together at TFA. Thank you for being part of it.',
})

# ── EMAIL 03 ──
emails.append({
    'filename': '03 - The Trait That Separates Good Swimmers From Improving Swimmers.html',
    'subject': 'The Trait That Separates Good Swimmers From Improving Swimmers',
    'title': 'The Trait That Separates Good Swimmers From Improving Swimmers',
    'hero': 'email-coaching.jpg',
    'dividers': ['photo-solo.jpg', 'email-improvement.jpg', 'photo-duo.jpg', 'photo-breaststroke.jpg'],
    'panels': [
        # Intro (DN)
        {'bg': NAVY, 'sections': [
            {'type': 'italic', 'content': '"What makes some swimmers improve steadily while others plateau?"'},
            {'type': 'paragraph', 'content': 'While physical ability matters, one factor consistently predicts long-term growth: coachability.'},
            {'type': 'paragraph', 'content': 'Coachability is not about personality. It is about response. It is the willingness to listen, accept correction, and apply feedback with consistency — even when it feels uncomfortable.'},
        ]},
        # W: What Coachability Actually Means + Why This Matters
        {'bg': WHITE, 'sections': [
            {'type': 'heading', 'content': 'What Coachability Actually Means'},
            {'type': 'paragraph', 'content': 'A coachable swimmer:'},
            {'type': 'bullets', 'content': [
                'Listens fully before reacting',
                'Accepts correction without defensiveness',
                'Asks questions when something is unclear',
                'Applies feedback immediately in the water',
                'Reflects on performance honestly',
            ]},
            {'type': 'paragraph', 'content': 'Correction in swimming is not criticism. It is refinement. Even small technical adjustments — hand entry angle, turn timing, breathing rhythm — can significantly affect performance over time. Swimmers who understand this tend to improve more steadily because they treat feedback as an opportunity, not a judgment.'},
            {'type': 'heading', 'content': 'Why This Matters for Development'},
            {'type': 'paragraph', 'content': 'Swimming is a technical sport. Progress often depends on making small improvements repeatedly across thousands of repetitions. A swimmer who resists correction slows that process. A swimmer who embraces it accelerates it.'},
            {'type': 'paragraph', 'content': 'Coachability also builds trust. When coaches see that an athlete is open to instruction and applying feedback consistently, they can safely layer more advanced skills and challenges into training. The development path becomes smoother.'},
        ]},
        # DN: Emotional Intelligence + Communication
        {'bg': NAVY, 'sections': [
            {'type': 'heading', 'content': 'Emotional Intelligence in Training'},
            {'type': 'paragraph', 'content': 'Competitive swimming can be mentally demanding. Athletes experience frustration, fatigue, and disappointment at times. Coachable swimmers learn to manage those emotions productively. They understand that:'},
            {'type': 'bullets', 'content': [
                'Temporary discomfort is part of growth',
                'One difficult practice does not define them',
                'Progress is rarely linear',
            ]},
            {'type': 'paragraph', 'content': 'This emotional maturity is just as important as physical ability. Parents can reinforce this by responding to tough practices or races with calm reflection rather than immediate analysis or blame. Sometimes the best post-practice question is simply: "What did you learn today?"'},
            {'type': 'heading', 'content': 'Communication and Initiative'},
            {'type': 'paragraph', 'content': 'Coachability also includes proactive communication. Swimmers who ask: "How can I improve my turns?" or "What should I focus on this week?" demonstrate ownership of their development. This shows maturity and signals readiness for growth.'},
            {'type': 'paragraph', 'content': 'Families can support this by encouraging swimmers to speak directly with coaches when they have questions, rather than stepping in immediately. This builds confidence and independence.'},
        ]},
        # W: What Uncoachable Behavior Looks Like
        {'bg': WHITE, 'sections': [
            {'type': 'heading', 'content': 'What Uncoachable Behavior Looks Like'},
            {'type': 'paragraph', 'content': 'It is helpful to recognize the opposite as well. Uncoachable behaviors may include:'},
            {'type': 'bullets', 'content': [
                'Arguing corrections',
                'Making excuses',
                'Ignoring instruction',
                'Blaming others for results',
            ]},
            {'type': 'paragraph', 'content': 'These responses slow development and create friction in a team environment. Fortunately, coachability is a skill that can be learned and strengthened over time.'},
        ]},
    ],
    'takeaway': 'The swimmers who improve most consistently are not always the most naturally gifted. They are the ones who: Listen. Apply. Reflect. Repeat.<br/><br/>Encouraging your swimmer to embrace feedback — especially when it feels challenging — is one of the most powerful ways you can support their long-term success.',
    'closing': 'We are committed to helping every TFA swimmer develop the skills and mindset to reach their potential.',
})

# ── EMAIL 04 ──
emails.append({
    'filename': '04 - Clinics, Private Lessons, and How Swimmers Actually Improve.html',
    'subject': 'Clinics, Private Lessons, and How Swimmers Actually Improve',
    'title': 'Clinics, Private Lessons, and How Swimmers Actually Improve',
    'hero': 'photo-lanes.jpg',
    'dividers': ['email-coaching.jpg', 'photo-duo.jpg', 'photo-kid.jpg', 'email-group.jpg'],
    'panels': [
        # Intro (DN)
        {'bg': NAVY, 'sections': [
            {'type': 'italic', 'content': '"Should my swimmer take private lessons?" "Would clinics help them improve faster?" "Are we missing something extra they should be doing?"'},
            {'type': 'paragraph', 'content': 'These are thoughtful questions, and understanding how supplemental instruction fits into development can help families make confident decisions.'},
        ]},
        # W: The Foundation + When Clinics Are Helpful
        {'bg': WHITE, 'sections': [
            {'type': 'heading', 'content': 'The Foundation: Group Training'},
            {'type': 'paragraph', 'content': 'At Texas Ford Aquatics, regular group practice is the primary engine of swimmer development. Daily training builds conditioning, technique, race skills, and mental resilience through consistent repetition over time.'},
            {'type': 'paragraph', 'content': 'Workouts are designed intentionally so swimmers progress step by step within their training group. Because of this structure, improvement comes mainly from showing up consistently and engaging fully in practice.'},
            {'type': 'paragraph', 'content': 'Clinics and private lessons are designed to support that process — not replace it.'},
            {'type': 'heading', 'content': 'When Clinics Are Helpful'},
            {'type': 'paragraph', 'content': 'Clinics are group learning opportunities focused on shared skills or concepts. They work best when swimmers of similar ability levels are learning the same technical focus at the same time. Examples may include:'},
            {'type': 'bullets', 'content': [
                'Starts and turns',
                'Stroke fundamentals',
                'Race strategy or meet preparation',
                'Individual Medley transitions',
            ]},
            {'type': 'paragraph', 'content': 'Clinics are educational in nature. They introduce or reinforce ideas swimmers then continue practicing during regular workouts. They are most effective when swimmers attend with the goal of learning — not expecting immediate performance changes.'},
        ]},
        # DN: When Private Lessons Make Sense + Why Coach Coordination Matters
        {'bg': NAVY, 'sections': [
            {'type': 'heading', 'content': 'When Private Lessons Make Sense'},
            {'type': 'paragraph', 'content': 'Private lessons are different. They are intended for short-term, individualized instruction when a swimmer has a specific need that cannot be fully addressed within a group setting. Examples might include:'},
            {'type': 'bullets', 'content': [
                'Correcting a persistent technical issue',
                'Supporting a swimmer returning from injury or extended absence',
                'Rebuilding confidence after time away from the sport',
                'Helping swimmers who need individualized learning support',
            ]},
            {'type': 'paragraph', 'content': 'Private lessons should always have a clear purpose and limited duration. They are meant to reinforce what is already being taught in practice, not introduce a separate development path.'},
            {'type': 'heading', 'content': 'Why Coach Coordination Matters'},
            {'type': 'paragraph', 'content': 'One important principle guides supplemental instruction: consistency. Each swimmer has a primary coach responsible for their long-term development and training progression.'},
            {'type': 'paragraph', 'content': 'When private lessons occur without coordination, swimmers may receive conflicting technical cues, which can slow improvement rather than accelerate it. Communication between coaches helps ensure:'},
            {'type': 'bullets', 'content': [
                'Instruction stays aligned',
                'Skills match the swimmer\'s current training stage',
                'Development remains consistent and safe',
            ]},
        ]},
        # W: What Clinics and Lessons Cannot Do + How Families Can Decide
        {'bg': WHITE, 'sections': [
            {'type': 'heading', 'content': 'What Clinics and Lessons Cannot Do'},
            {'type': 'paragraph', 'content': 'It is important to set realistic expectations. Neither clinics nor private lessons can:'},
            {'type': 'bullets', 'content': [
                'Replace regular practice attendance',
                'Build conditioning or endurance alone',
                'Guarantee faster race results',
                'Accelerate development beyond what time and repetition allow',
            ]},
            {'type': 'paragraph', 'content': 'Swimming improvement comes from sustained effort over months and years, not isolated sessions.'},
            {'type': 'heading', 'content': 'How Families Can Make the Best Decision'},
            {'type': 'paragraph', 'content': 'Before pursuing additional instruction, consider asking:'},
            {'type': 'bullets', 'content': [
                'Is my swimmer attending practice consistently?',
                'Are they applying coaching feedback daily?',
                'Do they have a specific technical need, or are we simply hoping for faster results?',
            ]},
            {'type': 'paragraph', 'content': 'Often, the greatest gains come from reinforcing habits already happening in practice.'},
        ]},
    ],
    'takeaway': 'Clinics provide education. Private lessons provide targeted refinement. But consistent group training is what drives real progress.<br/><br/>When supplemental tools are used intentionally — and in coordination with coaches — they can support development in a healthy and effective way.',
    'closing': 'We are always happy to discuss what makes sense for your swimmer. Reach out to your coach anytime.',
})

# ── EMAIL 05 ──
emails.append({
    'filename': '05 - Tech Suits Explained — What Families Should Know.html',
    'subject': 'Tech Suits Explained — What Families Should Know',
    'title': 'Tech Suits Explained — What Families Should Know',
    'hero': 'email-racing.jpg',
    'dividers': ['photo-blocks.jpg', 'photo-diver.jpg', 'photo-solo.jpg', 'email-improvement.jpg'],
    'panels': [
        # Intro (DN)
        {'bg': NAVY, 'sections': [
            {'type': 'italic', 'content': '"Does my swimmer need one?" "Will this help them swim faster?" "Are we behind if we don\'t have one?"'},
            {'type': 'paragraph', 'content': 'These are very common questions in competitive swimming, and understanding the role of equipment can help families make informed and confident decisions.'},
        ]},
        # W: What Tech Suits Are + Why Development Comes First
        {'bg': WHITE, 'sections': [
            {'type': 'heading', 'content': 'What Tech Suits Are — and What They Do'},
            {'type': 'paragraph', 'content': 'Tech suits are high-performance racing swimsuits designed to reduce drag in the water and provide muscle compression. When used appropriately, they can offer small performance advantages during competition.'},
            {'type': 'paragraph', 'content': 'However, it is important to understand that tech suits are competition tools — not development tools. They do not teach technique, build endurance, or replace training.'},
            {'type': 'heading', 'content': 'Why Development Comes First'},
            {'type': 'paragraph', 'content': 'For younger swimmers especially, improvement should come primarily from learning skills, building strength, and gaining racing experience. Early overreliance on performance equipment can unintentionally shift focus away from the fundamentals that actually create long-term success:'},
            {'type': 'bullets', 'content': [
                'Stroke technique',
                'Body position',
                'Race skills',
                'Confidence through preparation',
            ]},
            {'type': 'paragraph', 'content': 'When swimmers believe performance comes from equipment rather than effort and training, development can slow. At TFA, the goal is to help athletes build confidence rooted in preparation — not apparel.'},
        ]},
        # DN: Age-Appropriate Guidance + Comfort, Cost, and Expectations
        {'bg': NAVY, 'sections': [
            {'type': 'heading', 'content': 'Age-Appropriate Guidance'},
            {'type': 'paragraph', 'content': 'Because of development and fairness considerations, there are clear recommendations around tech suit usage. For younger athletes, standard competition suits are appropriate, and the emphasis remains on learning and enjoyment of the sport.'},
            {'type': 'paragraph', 'content': 'As swimmers mature and reach higher levels of competition, tech suits may become appropriate for select championship or end-of-season meets — not every competition. Older athletes may use them more strategically, always with guidance from their coach.'},
            {'type': 'paragraph', 'content': 'Communication with your swimmer\'s coach is the best way to determine when — or if — a tech suit makes sense.'},
            {'type': 'heading', 'content': 'Comfort, Cost, and Expectations'},
            {'type': 'paragraph', 'content': 'Tech suits are intentionally very tight and can be difficult to put on or remove. Proper sizing and supervision are important to ensure comfort and safety. They are also expensive and designed for limited use, which is another reason programs encourage thoughtful, limited application.'},
            {'type': 'paragraph', 'content': 'It is important for swimmers to understand that wearing — or not wearing — a tech suit does not define their ability or potential. Strong performances come from preparation, not equipment.'},
        ]},
        # W: How Families Can Support Healthy Perspective
        {'bg': WHITE, 'sections': [
            {'type': 'heading', 'content': 'How Families Can Support Healthy Perspective'},
            {'type': 'paragraph', 'content': 'Parents can help by reinforcing a simple message: Success in swimming is earned through training. Helpful approaches include:'},
            {'type': 'bullets', 'content': [
                'Avoid comparing equipment with other swimmers',
                'Emphasize effort and improvement over race outcomes',
                'Allow coaches to guide timing and usage decisions',
                'Help swimmers focus on preparation rather than gear',
            ]},
            {'type': 'paragraph', 'content': 'When athletes understand that improvement comes from their work, they develop resilience and confidence that lasts far beyond one meet.'},
        ]},
    ],
    'takeaway': 'Tech suits can support performance at the right time — but they never replace preparation. Training builds swimmers. Equipment only supports what training has already created.',
    'closing': 'If you have questions about equipment guidelines, your swimmer\'s coach is always the best resource.',
})

# ── EMAIL 06 ──
emails.append({
    'filename': '06 - Why Volunteer Involvement Matters at TFA.html',
    'subject': 'Why Volunteer Involvement Matters at TFA',
    'title': 'Why Volunteer Involvement Matters at TFA',
    'hero': 'email-hero.jpg',
    'dividers': ['email-group.jpg', 'email-team.jpg', 'photo-wall-team.jpg', 'photo-team2.jpg'],
    'panels': [
        # Intro (DN)
        {'bg': NAVY, 'sections': [
            {'type': 'paragraph', 'content': 'When families join a competitive swim team, most of the focus is naturally on training, meets, and performance. What many do not initially realize is that a successful swim program also depends on family involvement behind the scenes.'},
            {'type': 'paragraph', 'content': 'Competitive swimming is a community effort. Meets require timers, marshals, hospitality support, and coordination. Team events require organization and staffing. Fundraising helps offset costs that would otherwise increase registration fees.'},
            {'type': 'paragraph', 'content': 'At Texas Ford Aquatics, we keep this structure simple and transparent.'},
        ]},
        # W: Swim-a-Thon + Earning Credit
        {'bg': WHITE, 'sections': [
            {'type': 'heading', 'content': 'The Swim-a-Thon Requirement'},
            {'type': 'paragraph', 'content': 'Each family is asked to raise $100 through our annual Swim-a-Thon. Families with swimmers only in Skills or Bronze groups are exempt. This event plays an important role in supporting the program while keeping overall costs manageable.'},
            {'type': 'heading', 'content': 'Earning Credit Toward Next Year'},
            {'type': 'paragraph', 'content': 'After meeting the $100 Swim-a-Thon goal, families may earn up to $200 in credit toward the following year\'s registration fee. This credit can be earned by:'},
            {'type': 'bullets', 'content': [
                'Volunteering at team events (credited per hour, up to a set maximum)',
                'Raising additional Swim-a-Thon funds',
                'Or a combination of both',
            ]},
            {'type': 'paragraph', 'content': 'This structure allows flexibility. Families can contribute time, fundraising effort, or a mix of both. The goal is not simply financial — it is participation.'},
        ]},
        # DN: Why This Matters + What We Want Families to Understand
        {'bg': NAVY, 'sections': [
            {'type': 'heading', 'content': 'Why This Matters for Swimmers'},
            {'type': 'paragraph', 'content': 'When families volunteer, several important things happen:'},
            {'type': 'bullets', 'content': [
                'Meets run smoothly and safely',
                'Athletes feel supported',
                'The team culture strengthens',
                'Costs remain more stable for everyone',
            ]},
            {'type': 'paragraph', 'content': 'Swimmers notice when parents show up to help. They see that their sport matters not only to them, but to their family and community. That shared investment builds pride and connection.'},
            {'type': 'heading', 'content': 'What We Want Families to Understand'},
            {'type': 'paragraph', 'content': 'Volunteer expectations are not designed to create pressure. They exist because swimming is uniquely dependent on community support. Unlike some sports, swim meets cannot function without active parent participation.'},
            {'type': 'paragraph', 'content': 'When everyone contributes a small amount, no one carries an unfair burden. Clear expectations prevent confusion and last-minute stress.'},
        ]},
        # W: How Families Can Approach This
        {'bg': WHITE, 'sections': [
            {'type': 'heading', 'content': 'How Families Can Approach This'},
            {'type': 'paragraph', 'content': 'The most successful approach is simple:'},
            {'type': 'bullets', 'content': [
                'Plan early in the season',
                'Select volunteer opportunities that fit your schedule',
                'View participation as part of your swimmer\'s experience',
                'Treat it as shared ownership rather than obligation',
            ]},
            {'type': 'paragraph', 'content': 'When families understand the "why" behind the structure, participation becomes more natural.'},
        ]},
    ],
    'takeaway': 'Texas Ford Aquatics is not just a place where swimmers train. It is a community built on shared effort. When families contribute time or fundraising support, they help sustain an environment where athletes can grow safely, competitively, and confidently.<br/><br/>Your involvement directly strengthens the program your swimmer benefits from every day.',
    'closing': 'Thank you for being part of the TFA community. Your support makes everything we do possible.',
})

# ── EMAIL 07 ──
emails.append({
    'filename': '07 - Why Hydration Matters More Than Most Families Realize.html',
    'subject': 'Why Hydration Matters More Than Most Families Realize',
    'title': 'Why Hydration Matters More Than Most Families Realize',
    'hero': 'photo-lone.jpg',
    'dividers': ['photo-young2.jpg', 'email-improvement.jpg', 'photo-young.jpg', 'photo-solo.jpg'],
    'panels': [
        # Intro (DN)
        {'bg': NAVY, 'sections': [
            {'type': 'paragraph', 'content': 'One of the most common surprises for new swim families is learning that swimmers can become dehydrated — even though they spend hours in the water.'},
            {'type': 'paragraph', 'content': 'Because athletes do not feel sweaty the way they might in field or court sports, hydration is often overlooked. Yet it plays a major role in performance, recovery, and overall health.'},
            {'type': 'paragraph', 'content': 'Many issues parents notice — unusual fatigue, muscle cramps, lack of focus, or inconsistent performance — can sometimes be traced back to inadequate hydration habits.'},
        ]},
        # W: Why Hydration Is Different + Hydration Starts Before Practice
        {'bg': WHITE, 'sections': [
            {'type': 'heading', 'content': 'Why Hydration Is Different in Swimming'},
            {'type': 'paragraph', 'content': 'Even in the pool, swimmers lose fluids through sweat and increased breathing during training. The water environment masks thirst signals, meaning athletes may not realize they are becoming dehydrated until performance is already affected.'},
            {'type': 'paragraph', 'content': 'Proper hydration supports:'},
            {'type': 'bullets', 'content': [
                'Endurance and strength',
                'Muscle function and coordination',
                'Focus and decision-making',
                'Recovery after practice',
                'Reduced risk of cramps and fatigue',
            ]},
            {'type': 'paragraph', 'content': 'When hydration drops, performance often drops with it.'},
            {'type': 'heading', 'content': 'Hydration Starts Before Practice'},
            {'type': 'paragraph', 'content': 'Good hydration does not begin when practice starts — it begins earlier in the day. Swimmers should be drinking fluids consistently throughout school and daily activities rather than trying to "catch up" right before training.'},
            {'type': 'paragraph', 'content': 'A simple indicator families can use is urine color. Pale yellow generally indicates good hydration, while darker color may suggest the swimmer needs more fluids.'},
        ]},
        # DN: During Practice + After Practice
        {'bg': NAVY, 'sections': [
            {'type': 'heading', 'content': 'During Practice'},
            {'type': 'paragraph', 'content': 'Athletes should bring a labeled, filled water bottle to every practice and meet. Small, regular sips are far more effective than drinking large amounts at once.'},
            {'type': 'paragraph', 'content': 'During longer or higher-intensity practices, fluids containing electrolytes may also be appropriate to help replace sodium lost during training. Relying on thirst alone is not reliable — by the time a swimmer feels thirsty, dehydration may already be present.'},
            {'type': 'heading', 'content': 'After Practice and Recovery'},
            {'type': 'paragraph', 'content': 'Hydration continues after swimmers leave the pool. Replacing fluids in the hours following training helps support muscle recovery and prepares the body for the next practice.'},
            {'type': 'paragraph', 'content': 'Water combined with normal meals is often sufficient, while longer or more intense sessions may benefit from drinks that include carbohydrates and electrolytes. Consistent recovery habits help swimmers maintain energy throughout the season.'},
        ]},
        # W: Signs to Watch For + How Families Can Help
        {'bg': WHITE, 'sections': [
            {'type': 'heading', 'content': 'Signs Families Should Watch For'},
            {'type': 'paragraph', 'content': 'Parents and swimmers should be aware of potential signs of dehydration, including:'},
            {'type': 'bullets', 'content': [
                'Headaches or dizziness',
                'Muscle cramps',
                'Unusual fatigue',
                'Difficulty concentrating',
                'Declining performance',
            ]},
            {'type': 'paragraph', 'content': 'If symptoms appear, hydration should be addressed promptly, and activity may need to pause if symptoms are severe.'},
            {'type': 'heading', 'content': 'How Families Can Help'},
            {'type': 'paragraph', 'content': 'Parents can make a significant difference by helping hydration become routine:'},
            {'type': 'bullets', 'content': [
                'Encourage regular fluid intake during the school day',
                'Ensure swimmers arrive with a full water bottle',
                'Reinforce drinking during practice breaks',
                'Support recovery hydration after training',
            ]},
            {'type': 'paragraph', 'content': 'Small habits practiced consistently produce meaningful results over time.'},
        ]},
    ],
    'takeaway': 'Hydration is not optional preparation — it is part of training. Swimmers who hydrate consistently recover better, perform more consistently, and reduce preventable setbacks throughout the season.<br/><br/>Helping your swimmer build strong hydration habits is one of the simplest and most effective ways to support their success.',
    'closing': 'A well-hydrated swimmer is a better-performing swimmer. Small daily habits make a big difference.',
})

# ── EMAIL 08 ──
emails.append({
    'filename': '08 - The Performance Factor Most Swimmers Overlook.html',
    'subject': 'The Performance Factor Most Swimmers Overlook',
    'title': 'The Performance Factor Most Swimmers Overlook',
    'hero': 'photo-lanes.jpg',
    'dividers': ['email-improvement.jpg', 'photo-solo.jpg', 'photo-breaststroke.jpg', 'email-racing.jpg'],
    'panels': [
        # Intro (DN)
        {'bg': NAVY, 'sections': [
            {'type': 'paragraph', 'content': 'As swimmers progress in competitive athletics, families often focus on training schedules, technique, and competition results. What many do not realize is that one of the biggest performance advantages happens outside the pool — sleep and time management.'},
            {'type': 'paragraph', 'content': 'Student-athletes balance school, practice, homework, social activities, and family responsibilities. Without strong routines, it becomes easy for recovery to suffer, and when recovery declines, performance usually follows.'},
        ]},
        # W: Why Sleep Matters + Connection Between Sleep and Performance
        {'bg': WHITE, 'sections': [
            {'type': 'heading', 'content': 'Why Sleep Matters for Athletes'},
            {'type': 'paragraph', 'content': 'Sleep is not simply rest. It is when the body repairs and adapts to training. During sleep, athletes experience:'},
            {'type': 'bullets', 'content': [
                'Muscle recovery and growth',
                'Improved reaction time and coordination',
                'Memory consolidation and learning',
                'Emotional regulation and stress recovery',
                'Reduced injury risk',
            ]},
            {'type': 'paragraph', 'content': 'Most student-athletes require approximately 8–9 hours of sleep each night to function at their best. When swimmers consistently fall short of that amount, coaches often see slower reaction times, decreased endurance, difficulty focusing, and increased frustration during practice.'},
            {'type': 'paragraph', 'content': 'These effects are physical, not motivational.'},
            {'type': 'heading', 'content': 'The Connection Between Sleep and Performance'},
            {'type': 'paragraph', 'content': 'Many performance plateaus are not caused by lack of effort but by lack of recovery. Training creates stress on the body. Sleep is when adaptation occurs. Without adequate recovery, swimmers may work just as hard but see fewer results.'},
            {'type': 'paragraph', 'content': 'Over time, chronic fatigue can increase injury risk and reduce enjoyment of the sport. Helping athletes understand that sleep is part of training — not separate from it — is an important mindset shift.'},
        ]},
        # DN: Time Management + Practical Sleep Habits
        {'bg': NAVY, 'sections': [
            {'type': 'heading', 'content': 'Time Management Reduces Stress'},
            {'type': 'paragraph', 'content': 'Strong time management habits make better sleep possible. Student-athletes who plan their schedules tend to feel more in control and less overwhelmed. Instead of late-night homework or rushed preparation, they create predictable routines that protect recovery time.'},
            {'type': 'paragraph', 'content': 'Simple strategies include:'},
            {'type': 'bullets', 'content': [
                'Planning the week in advance around practices and schoolwork',
                'Breaking homework into smaller study blocks',
                'Completing challenging tasks earlier in the day when energy is highest',
                'Avoiding procrastination that pushes work late into the evening',
            ]},
            {'type': 'paragraph', 'content': 'Small organizational habits often make a significant difference.'},
            {'type': 'heading', 'content': 'Practical Sleep Habits That Help'},
            {'type': 'paragraph', 'content': 'Families can support better recovery by encouraging consistent routines:'},
            {'type': 'bullets', 'content': [
                'Maintain regular sleep and wake times, even on weekends',
                'Reduce screen use before bedtime',
                'Avoid caffeine later in the day',
                'Keep naps short and earlier when possible',
            ]},
            {'type': 'paragraph', 'content': 'Consistency matters more than perfection. Over time, predictable routines help athletes recover more effectively.'},
        ]},
        # W: The Sleep-Performance Cycle
        {'bg': WHITE, 'sections': [
            {'type': 'heading', 'content': 'The Sleep–Performance Cycle'},
            {'type': 'paragraph', 'content': 'Poor time management often leads to late nights. Late nights lead to insufficient sleep. Insufficient sleep leads to reduced performance and increased stress — both in the classroom and in the pool.'},
            {'type': 'paragraph', 'content': 'When swimmers manage time well, the opposite occurs: better sleep, improved recovery, and stronger performance.'},
        ]},
    ],
    'takeaway': 'Your swimmer\'s most important piece of equipment is their body. Training builds fitness. Sleep builds adaptation. Time management protects both.<br/><br/>Helping your swimmer prioritize recovery is one of the most powerful ways to support their long-term success.',
    'closing': 'Rest well, train well, perform well. It starts with the habits built at home.',
})

# ── EMAIL 09 ──
emails.append({
    'filename': '09 - What Is Normal — and What Isn\'t — for Swimmers.html',
    'subject': 'What Is Normal — and What Isn\'t — for Swimmers',
    'title': 'What Is Normal — and What Isn\'t — for Swimmers',
    'hero': 'photo-solo.jpg',
    'dividers': ['email-coaching.jpg', 'photo-duo.jpg', 'photo-young2.jpg', 'photo-young.jpg'],
    'panels': [
        # Intro (DN)
        {'bg': NAVY, 'sections': [
            {'type': 'italic', 'content': '"Is this soreness normal?" "Should they keep practicing?" "When should we be concerned?"'},
            {'type': 'paragraph', 'content': 'Competitive swimming is a repetitive sport, and understanding the difference between normal training responses and potential health concerns helps families support athletes safely and confidently.'},
        ]},
        # W: Normal vs. Concerning + Shoulder Health
        {'bg': WHITE, 'sections': [
            {'type': 'heading', 'content': 'Normal vs. Concerning Discomfort'},
            {'type': 'paragraph', 'content': 'Some physical fatigue is expected as swimmers adapt to training. Normal experiences may include:'},
            {'type': 'bullets', 'content': [
                'Mild muscle soreness after practice',
                'Temporary fatigue following harder workouts',
                'General muscle tiredness during periods of increased training',
            ]},
            {'type': 'paragraph', 'content': 'These are signs the body is adapting. However, certain symptoms should never be ignored:'},
            {'type': 'bullets', 'content': [
                'Sharp or worsening pain',
                'Pain that limits movement',
                'Discomfort lasting several days',
                'Pain affecting daily activities outside the pool',
            ]},
            {'type': 'paragraph', 'content': 'Early communication allows coaches to adjust training appropriately before small issues become larger problems.'},
            {'type': 'heading', 'content': 'Shoulder Health and Technique'},
            {'type': 'paragraph', 'content': 'Because swimming involves repeated overhead motion, shoulders require particular attention. Technique plays a major role in long-term shoulder health. Small mechanical errors repeated over time can lead to overuse problems, which is why coaches emphasize technical corrections even when swimmers feel strong.'},
            {'type': 'paragraph', 'content': 'Encouraging swimmers to speak up early about discomfort helps protect both performance and health.'},
        ]},
        # DN: Muscle Cramps + Other Common Conditions
        {'bg': NAVY, 'sections': [
            {'type': 'heading', 'content': 'Muscle Cramps and Hydration'},
            {'type': 'paragraph', 'content': 'Muscle cramps are typically linked to fatigue, hydration, or electrolyte imbalance. If a swimmer experiences a severe cramp involving major muscle groups, coaches are trained to respond immediately to relieve the cramp safely.'},
            {'type': 'paragraph', 'content': 'Swimmers are not returned to activity until symptoms fully resolve. Families can help reduce risk by reinforcing hydration and proper recovery habits.'},
            {'type': 'heading', 'content': 'Other Common Conditions'},
            {'type': 'paragraph', 'content': 'Swimmers may occasionally experience issues such as swimmer\'s ear or exercise-related breathing challenges. Preventative habits — drying ears properly, warming up thoroughly, and communicating symptoms early — often help manage these situations effectively.'},
            {'type': 'paragraph', 'content': 'When symptoms persist or worsen, consultation with a medical professional is important.'},
        ]},
        # W: Why Communication Matters + How Families Can Help
        {'bg': WHITE, 'sections': [
            {'type': 'heading', 'content': 'Why Communication Matters'},
            {'type': 'paragraph', 'content': 'One of the most important habits swimmers can develop is speaking up early. Athletes sometimes hesitate because they do not want to miss practice or disappoint coaches. In reality, early communication helps coaches make smart adjustments that support long-term progress.'},
            {'type': 'paragraph', 'content': 'Our shared goal is always athlete health first.'},
            {'type': 'heading', 'content': 'How Families Can Help'},
            {'type': 'paragraph', 'content': 'Parents can support their swimmer by:'},
            {'type': 'bullets', 'content': [
                'Encouraging honest communication about discomfort',
                'Avoiding the "push through pain" mindset',
                'Notifying coaches of medical concerns when appropriate',
                'Supporting recovery habits outside practice',
            ]},
            {'type': 'paragraph', 'content': 'Healthy athletes develop more consistently and remain engaged in the sport longer.'},
        ]},
    ],
    'takeaway': 'Most training discomfort is temporary and normal — but communication is essential. When swimmers, families, and coaches communicate early, small issues stay small and athletes stay healthy.',
    'closing': 'Your swimmer\'s health is our priority. When in doubt, communicate early and we will work together.',
})

# ═══════════════════════════════════════════════════════
# GENERATE ALL EMAILS
# ═══════════════════════════════════════════════════════

import os

output_dir = '/home/user/golocalgroup/emails'
os.makedirs(output_dir, exist_ok=True)

for email in emails:
    html_content = build_email(
        title=email['title'],
        subject=email['subject'],
        hero_img=email['hero'],
        divider_imgs=email['dividers'],
        panels_content=email['panels'],
        takeaway_text=email['takeaway'],
        closing_text=email['closing'],
    )
    filepath = os.path.join(output_dir, email['filename'])
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html_content)
    print(f"✓ {email['filename']}")

print(f"\nAll {len(emails)} emails generated in {output_dir}")
