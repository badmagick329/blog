// The handover guide lives where the client works, not in a document she has
// to find. Keep it in step with the Posts and Media collections.
export function DashboardGuide() {
  return (
    <details className='dashboard-guide' open>
      <summary>How to publish a post</summary>
      <ol>
        <li>
          Open <strong>Posts</strong> and click <strong>Create New</strong>.
          Give it a title; the web address in <strong>Slug</strong> fills in
          from it.
        </li>
        <li>
          Write in <strong>Body</strong>. The toolbar has bold, italics,
          headings, quotes and links. Pasting from Google Docs or Word keeps
          basic formatting.
        </li>
        <li>
          Under <strong>Cover</strong>, upload a photo as it comes off your
          phone or camera (JPEG, PNG or WebP, up to 20 MB). It is resized and
          converted for the web automatically.
        </li>
        <li>
          The cover is cut to a landscape shape. To choose what stays in view,
          click the pencil next to the photo, then <strong>Edit Image</strong>,
          and drag the focal point onto the important part, or draw a crop. Then
          click <strong>Save</strong>.
        </li>
        <li>
          Everything saves as a draft while you type, and visitors never see
          drafts. The eye icon next to <strong>Publish changes</strong> shows
          the real page beside the editor, updating as you type; the arrow icon
          opens it in a new tab.
        </li>
        <li>
          Click <strong>Publish changes</strong>. The post is on the site
          straight away. <strong>Published at</strong> sets its date; a future
          date keeps it hidden until that day.
        </li>
      </ol>
      <p>
        Editing a published post works the same way: visitors see the old
        version until you click <strong>Publish changes</strong> again. To take
        a post down, choose <strong>Unpublish</strong> from the menu next to
        that button. The <strong>Versions</strong> tab restores any earlier
        version.
      </p>
      <p>
        The wording of every page is under <strong>Site copy</strong> in the
        menu: Home, About, Blog, Contact, Terms of Use, and the header, footer
        and 404 page. It works like a post: edit, check it with the eye icon,
        then click <strong>Publish changes</strong>. To throw away unpublished
        edits, open <strong>Versions</strong>, click the newest entry marked
        Published (it may say <strong>Previously Published</strong>), then{' '}
        <strong>Restore this version</strong>.
      </p>
      <p>
        Spotted something to fix or change? While you’re logged in, every page
        on the site has a <strong>Feedback</strong> button at the bottom right;
        it notes the page for you and takes an optional screenshot. Your notes
        are under <strong>Feedback</strong> in the menu.
      </p>
      <p>
        Forgot your password? Use <strong>Forgot password?</strong> on the login
        page and a reset link arrives by email. Change it any time under your
        account (top right).
      </p>
    </details>
  );
}
