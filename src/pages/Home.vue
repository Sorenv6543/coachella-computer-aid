<script setup lang="ts">
import HeroSection from '@/components/home/Hero/HeroSection.vue'
import MissionSection from '@/components/home/Mission/MissionSection.vue'
import WhoWeHelpSection from '@/components/home/Audience/WhoWeHelpSection.vue'
import ServicesSection from '@/components/home/Services/ServicesSection.vue'
import HowItWorksSection from '@/components/home/HowItWorks/HowItWorksSection.vue'

// CTASection (which per Homepage/Sections.md should follow HowItWorks) lives
// on sibling branch feat/cta-section and isn't merged into this branch yet —
// intentionally not imported here to avoid a broken build. Wire it in after
// HowItWorksSection once that branch lands.
</script>

<template>
  <HeroSection />
  <MissionSection />
  <WhoWeHelpSection />
  <ServicesSection />
  <HowItWorksSection />
</template>
