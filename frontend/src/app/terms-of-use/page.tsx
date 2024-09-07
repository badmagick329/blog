import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use',
};

export default function TermsOfUse() {
  return (
    <main className='mx-auto w-full'>
      <article className='container prose pt-8 text-foreground dark:prose-invert lg:prose-lg'>
        <h1 className='text-center'>Website Terms of Use</h1>
        <h2>Terms of Use</h2>
        <p>
          Please read these Terms of Use carefully before using this website.
          Using this website indicates your agreement with these Terms of Use.
          If you do not agree with any of the below Terms of Use, do not use
          this website. Krista Lomu reserves the right, at its sole discretion,
          to modify, alter or otherwise update these Terms of Use at any time,
          and you agree to be bound by such modifications, alterations or
          updates.
        </p>
        <h2>Information on this website</h2>
        <p>
          Whilst every effort is made to update the information contained on
          this website, neither Krista Lomu nor any third party or data or
          content provider make any representations or warranties, whether
          express, implied in law or residual, as to the sequence, accuracy,
          completeness or reliability of information, opinions, research
          information, data and/or content contained on the website (including
          but not limited to any information which may be provided by any third
          party or data or content providers) (“information”) and shall not be
          bound in any manner by any information contained on the website.
        </p>
        <p>
          Krista Lomu reserves the right at any time to change or discontinue
          any aspect or feature of this website without notice. No information
          shall be construed as advice, and information is offered for
          information purposes only and is not intended for trading purposes.
          You and your company rely on the information contained on this website
          at your own risk.
        </p>
        <h2>Trademarks, Copyrights and Restrictions</h2>
        <p>
          The Krista Lomu website is controlled and operated by Krista Lomu. All
          material on this Site, including, but not limited to text, photos, and
          graphics, is protected by copyrights, which are owned and controlled
          by Krista Lomu or by other parties that have granted permission to use
          their material on the Krista Lomu website (“Copyrights”).
        </p>
        <p>
          Material from the Krista Lomu website may not be copied, reproduced,
          republished, downloaded, posted, transmitted, or distributed in any
          way. Modification of the materials or use of the materials for any
          other purpose is a violation of the copyrights and other proprietary
          rights. For purposes of this Terms Of Use Agreement, using any such
          material on any other website or networked computer environment is
          prohibited.
        </p>
        <h2>Links to External Websites</h2>
        <p>
          Krista Lomu, whether or not affiliated with sites which may be linked
          to this Site, is not responsible for their content (“Linked Sites”).
          The linked sites are for your convenience only, and you access them at
          your own risk. Appearance of linked sites does not constitute
          endorsement of the linked Site’s website or information, products or
          services.
        </p>
        <h2>Links to This Website</h2>
        <p>
          Krista Lomu encourages other businesses or individuals to link their
          sites to this Site. You do not have to obtain permission to do so,
          although we would be grateful if you could contact Krista Lomu so we
          can keep any such links up to date. If you wish to establish a link to
          this website or any particular page of this website, it is requested
          that the link does not open within another website.
        </p>
        <h2>Website User Activity</h2>
        <p>
          As a user of the Site, you agree to use the Site legally, not to use
          the Site for illegal purposes and not to:
        </p>
        <ul className='flex flex-col gap-0'>
          <li style={{ margin: 0 }}>
            Harass or mistreat other users of the Site or Krista Lomu;
          </li>
          <li style={{ margin: 0 }}>
            Violate the intellectual property rights of the Site owner(s) or any
            third party to the Site;
          </li>
          <li style={{ margin: 0 }}>
            Act in any way that could be considered fraudulent or
          </li>
          <li style={{ margin: 0 }}>
            Post any material that may be deemed inappropriate or offensive.
          </li>
        </ul>
        <p>
          If we believe you are using the Site illegally or in a manner that
          violates these Terms of Use, we reserve the right to limit, suspend,
          or terminate your access to the Site and take any legal steps
          necessary to prevent you from accessing the Site.
        </p>
        <h2>Web Analytics Tools</h2>
        <p>
          The Site may use web analytics tools to collect information on when
          users access the Site and how long they remain on the page. This
          information is stored securely and will not be connected to your
          personal information as a user of the Site.
        </p>
        <h2>Personal Information</h2>
        <p>
          If you use the website email or contact Krista Lomu via social media,
          your personal information may be collected and stored securely. This
          information will be password-protected and governed by the privacy
          rules and regulations of the third-party platforms you use to contact.
          Please contact Krista Lomu if you want to see what information is
          stored and to ask for the data to be destroyed.
        </p>

        <h2>Website Security</h2>
        <p>
          We do not guarantee that the Site will be secure or free from bugs or
          viruses. You are responsible for configuring your information
          technology, computer programs, and platform to access the Site.
        </p>
        <h2>Disclaimer</h2>
        <p>
          Krista Lomu nor its affiliated or related entities or its content
          providers are responsible or liable to any person or entity whatsoever
          (including, without limitation, persons who may use or rely on such
          data/materials or to whom such data/materials may be furnished) for
          any loss, damage (whether actual, consequential, punitive or
          otherwise), injury, claim, liability or other cause of any kind or
          character whatsoever based upon or resulting from any information or
          opinions provided in the Krista Lomu website.
        </p>
        <h2>Applicable Law</h2>
        <p>
          Please note that these Terms of Use, their subject matter and their
          formation are governed by English law.
        </p>
        <h2>Contact Details</h2>
        <p>
          If you have any questions, comments, or concerns about the website,
          these Terms of Use, any other relevant policies or notices, or the way
          Krista Lomu is handling your personal information, please email
          kristalomu@gmail.com.
        </p>
      </article>
    </main>
  );
}
