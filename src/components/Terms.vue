<template>
    <div>
        <!--BACK BUTTON-->
        <div class="mx-auto max-w-2xl min-w-2xl hidden md:flex">
            <div class="flex items-center my-4 cursor-pointer text-copy-secondary hover:text-copy-hover" @click="goBack">
                <svg class="fill-current inline-block h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 20 20">
                    <path d="M3.828 9l6.071-6.071-1.414-1.414L0 10l.707.707 7.778 7.778 1.414-1.414L3.828 11H20V9H3.828z"/>
                </svg>
                <p class="font-thin ml-2">{{$t('back')}}</p>
            </div>
        </div>
        <div class="mx-auto max-w-2xl min-w-2xl mt-10 md:mt-0">
            <div class="md:flex items-center border-2 rounded-t-lg border-border-primary bg-background-secondary">
                <p class="section-header">Terms of Use and Privacy Policy</p>
            </div>
            <div class="sm:block border-2 border-t-0 rounded-b-lg border-border-primary p-5 bg-background-secondary text-copy-primary leading-relaxed">
                <p class="font-thin">
                    This page here is to inform website visitors about terms of use and policies with the collection,
                    use, and disclosure of Personal Information on this (flashcards.rocks) website.
                    I will refer to it as 'the Service' further.
                </p>
                <p class="font-bold text-lg pt-5">Information Collection and Use</p>
                <p class="font-thin">
                    If you decide to register on the Service, I will ask you to provide your email address and name.
                    This information will be used to contact or identify you as well as for providing and improving the Service.
                    I will not share your information with anyone.
                </p>
                <p class="font-bold text-lg pt-5">Cookies</p>
                <p class="font-thin">
                    Cookies are files with small amount of data. They are commonly used as a unique anonymous identifier.
                    Websites you visit send it to your browser, and they are stored on your computer's hard drive.<br/>
                    The Service uses these "cookies" to improve your user experience.
                    You have the option to either accept or refuse these cookies and know when a cookie is being sent to your computer.
                    If you choose to refuse our cookies, you may not be able to use some portions of the Service.
                </p>
                <p class="font-bold text-lg pt-5">Third-Party Service Providers</p>
                <p class="font-thin">
                    I do not employ any third-party companies and individuals and do not use any trackers and ads providers on the Service pages.
                </p>
                <p class="font-bold text-lg pt-5">User-Generated Content</p>
                <p class="font-thin">
                    As a registered user of the Service, you could decide to share the content you've created with other Service's users.
                    If you do so, your name will be visible to other users. <br/>
                    As a one-person shop, I do not have much ability to moderate any shared content.
                    I kindly ask you to be a nice person and don't post anything that could insult or harm people in any way.
                    I reserve the right to delete any shared content from the Service if I receive any complaints about it.<br/>
                    If while using the Service, you see something you consider inappropriate, please, contact me,
                    and I will do my best to handle the situation.
                </p>
                <p class="font-bold text-lg pt-5">Security</p>
                <p class="font-thin">
                    I value your trust in providing your Personal Information and strive to use commercially acceptable means of protecting it.
                    However, remember that no method of transmission over the internet, or method of electronic storage
                    is 100% secure and reliable, and I cannot guarantee its absolute security.
                </p>
                <p class="font-bold text-lg pt-5">Links to Other Sites</p>
                <p class="font-thin">
                    The Service may contain links to other sites. If you click on a third-party link, you will be directed to that site.
                    Note that I do not operate these external sites.
                    Therefore, I strongly advise you to review the Privacy Policy of these websites.
                    I have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
                </p>
                <p class="font-bold text-lg pt-5">Changes to This Privacy Policy</p>
                <p class="font-thin">
                    I may update this Privacy Policy from time to time.
                    Thus, I advise you to review this page periodically for any changes.
                    I will notify you of any changes by posting the new Privacy Policy on this page.
                    These changes are effective immediately after they are posted on this page.
                </p>
                <p class="font-bold text-lg pt-5">Contact Me</p>
                <p class="font-thin">
                    If you have any questions or suggestions about this Privacy Policy, do not hesitate to contact me at <a class="text-blue-700" href="mailto:al@alvox.net">alex@flashcards.rocks</a>.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Terms",
        props: ['reg_name', 'reg_email'],
        methods: {
            goBack() {
                if (this.reg_name || this.reg_email) {
                    this.$router.push({name: 'Registration', params: {reg_name: this.reg_name, reg_email: this.reg_email}})
                } else {
                    this.$router.back()
                }
            }
        }
    }
</script>
