<script>
  import { onMount } from 'svelte';
  
  export let title = "Get In Touch";
  export let subtitle = "";
  export let email = "";
  export let phone = "";
  export let social_links = [];
  
  let contactElement;
  let visible = false;
  let formData = {
    name: '',
    email: '',
    message: ''
  };
  let isSubmitting = false;
  
  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visible = true;
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(contactElement);
    
    return () => observer.unobserve(contactElement);
  });
  
  async function handleSubmit(e) {
    e.preventDefault();
    isSubmitting = true;
    
    // Simulate form submission
    setTimeout(() => {
      alert('Message sent! I\'ll get back to you soon.');
      formData = { name: '', email: '', message: '' };
      isSubmitting = false;
    }, 1000);
  }
</script>

<section class="contact-section" bind:this={contactElement} class:visible>
  <div class="contact-container">
    <div class="contact-header">
      <h2 class="contact-title" data-aos="fade-up">{title}</h2>
      {#if subtitle}
        <p class="contact-subtitle" data-aos="fade-up" data-aos-delay="200">{subtitle}</p>
      {/if}
    </div>
    
    <div class="contact-content">
      <div class="contact-info" data-aos="fade-right" data-aos-delay="300">
        <div class="info-item">
          <h3>Let's Create Together</h3>
          <p>Ready to bring your vision to life? I'm here to collaborate on extraordinary projects.</p>
        </div>
        
        {#if email}
          <div class="info-item">
            <h4>Email</h4>
            <a href="mailto:{email}" class="contact-link">{email}</a>
          </div>
        {/if}
        
        {#if phone}
          <div class="info-item">
            <h4>Phone</h4>
            <a href="tel:{phone}" class="contact-link">{phone}</a>
          </div>
        {/if}
        
        {#if social_links.length > 0}
          <div class="info-item">
            <h4>Follow</h4>
            <div class="social-links">
              {#each social_links as link}
                <a href={link.url} target="_blank" rel="noopener" class="social-link">
                  {link.name}
                </a>
              {/each}
            </div>
          </div>
        {/if}
      </div>
      
      <form class="contact-form" data-aos="fade-left" data-aos-delay="400" on:submit={handleSubmit}>
        <div class="form-group">
          <input 
            type="text" 
            placeholder="Your Name" 
            bind:value={formData.name}
            required
            class="form-input"
          />
        </div>
        
        <div class="form-group">
          <input 
            type="email" 
            placeholder="Your Email" 
            bind:value={formData.email}
            required
            class="form-input"
          />
        </div>
        
        <div class="form-group">
          <textarea 
            placeholder="Your Message"
            bind:value={formData.message}
            required
            rows="6"
            class="form-textarea"
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          class="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  </div>
  
  <div class="contact-bg-effects">
    <div class="effect-circle"></div>
    <div class="effect-lines"></div>
  </div>
</section>

<style>
  .contact-section {
    padding: 100px 0;
    background: #000;
    position: relative;
    overflow: hidden;
    width: 100vw;
    margin: 0;
  }
  
  .contact-container {
    width: 100%;
    padding: 0 40px;
    margin: 0;
    position: relative;
    z-index: 1;
  }
  
  .contact-header {
    text-align: center;
    margin-bottom: 80px;
    opacity: 0;
    transform: translateY(30px);
    transition: all 1s ease;
  }
  
  .visible .contact-header {
    opacity: 1;
    transform: translateY(0);
  }
  
  .contact-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 900;
    color: #fff;
    margin: 0 0 20px 0;
    text-transform: uppercase;
    letter-spacing: -0.02em;
    background: linear-gradient(90deg, #fff 0%, #9333ea 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .contact-subtitle {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.7);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
  
  .contact-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
  }
  
  .contact-info {
    opacity: 0;
    transform: translateX(-50px);
    transition: all 1s ease 0.2s;
  }
  
  .visible .contact-info {
    opacity: 1;
    transform: translateX(0);
  }
  
  .info-item {
    margin-bottom: 40px;
  }
  
  .info-item h3 {
    font-size: 1.8rem;
    color: #fff;
    margin: 0 0 15px 0;
    font-weight: 700;
  }
  
  .info-item h4 {
    font-size: 1rem;
    color: rgba(147, 51, 234, 0.8);
    margin: 0 0 10px 0;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  
  .info-item p {
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
    margin: 0;
  }
  
  .contact-link {
    color: #fff;
    text-decoration: none;
    font-size: 1.1rem;
    transition: color 0.3s ease;
  }
  
  .contact-link:hover {
    color: #9333ea;
  }
  
  .social-links {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
  
  .social-link {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    padding: 8px 16px;
    border: 1px solid rgba(147, 51, 234, 0.3);
    border-radius: 20px;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .social-link:hover {
    color: #fff;
    border-color: #9333ea;
    background: rgba(147, 51, 234, 0.1);
  }
  
  .contact-form {
    opacity: 0;
    transform: translateX(50px);
    transition: all 1s ease 0.4s;
  }
  
  .visible .contact-form {
    opacity: 1;
    transform: translateX(0);
  }
  
  .form-group {
    margin-bottom: 30px;
  }
  
  .form-input,
  .form-textarea {
    width: 100%;
    padding: 20px;
    background: rgba(255, 255, 255, 0.02);
    border: 2px solid rgba(147, 51, 234, 0.2);
    border-radius: 8px;
    color: #fff;
    font-size: 1rem;
    transition: all 0.3s ease;
    font-family: inherit;
  }
  
  .form-input::placeholder,
  .form-textarea::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
  
  .form-input:focus,
  .form-textarea:focus {
    outline: none;
    border-color: #9333ea;
    background: rgba(147, 51, 234, 0.05);
    box-shadow: 0 0 20px rgba(147, 51, 234, 0.2);
  }
  
  .form-textarea {
    resize: vertical;
    min-height: 120px;
  }
  
  .submit-btn {
    width: 100%;
    padding: 20px;
    background: transparent;
    border: 2px solid #9333ea;
    color: #fff;
    font-size: 1.1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .submit-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.3), transparent);
    transition: left 0.5s ease;
  }
  
  .submit-btn:hover::before {
    left: 100%;
  }
  
  .submit-btn:hover {
    background: rgba(147, 51, 234, 0.1);
    box-shadow: 0 0 30px rgba(147, 51, 234, 0.4);
  }
  
  .submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .contact-bg-effects {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
  }
  
  .effect-circle {
    position: absolute;
    top: 20%;
    right: 10%;
    width: 300px;
    height: 300px;
    border: 1px solid rgba(147, 51, 234, 0.1);
    border-radius: 50%;
    animation: rotate 20s linear infinite;
  }
  
  .effect-lines {
    position: absolute;
    bottom: 20%;
    left: 10%;
    width: 200px;
    height: 200px;
    background-image: 
      linear-gradient(45deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px),
      linear-gradient(-45deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
    animation: pulse-slow 6s ease-in-out infinite;
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes pulse-slow {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.1; }
  }
  
  @media (max-width: 968px) {
    .contact-content {
      grid-template-columns: 1fr;
      gap: 60px;
    }
    
    .contact-info,
    .contact-form {
      transform: none;
    }
    
    .visible .contact-info,
    .visible .contact-form {
      transform: none;
    }
  }
  
  @media (max-width: 480px) {
    .contact-section {
      padding: 60px 0;
    }
    
    .contact-container {
      padding: 0 20px;
    }
    
    .social-links {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>