# Unused Files Report

This document lists all unused files, images, and SVGs in the project that can be safely deleted.

## Summary
- **Total Unused SVG Files**: 16
- **Total Unused TSX Components (imports)**: 16
- **Total Unused UI Components**: 48 (entire /components/ui folder)
- **Unused Main Components**: 1 (HeroMobile.tsx)

---

## Unused SVG Files (imports/svg-*.ts)

These SVG path files are not imported by any component:

1. `/imports/svg-4fm3ckmz8y.ts`
2. `/imports/svg-8kj625f1bt.ts`
3. `/imports/svg-b2xxq9wuvq.ts`
4. `/imports/svg-cu4u3fgzri.ts`
5. `/imports/svg-d0favgo7nw.ts`
6. `/imports/svg-gfu6b0tm98.ts`
7. `/imports/svg-ho24kbjal8.ts`
8. `/imports/svg-k4gs4aeqfc.ts`
9. `/imports/svg-kzt9n1bw03.ts`
10. `/imports/svg-n4qm844sqa.ts`
11. `/imports/svg-ndho0ndspx.ts`
12. `/imports/svg-o6e6pwo657.ts`
13. `/imports/svg-uaozqtkj8b.ts`
14. `/imports/svg-uqo9x5kpph.ts`
15. `/imports/svg-vn415xqz4a.ts`
16. `/imports/svg-x1kvigjlxz.ts`

---

## Unused TSX Components (imports/*.tsx)

These Figma-imported components are not used anywhere:

1. `/imports/BlogCardsSlidesUp.tsx`
2. `/imports/BlogExpandable.tsx`
3. `/imports/BlogTitleSlidesUp.tsx`
4. `/imports/BlogWhiteBgSlidesUp-792-501.tsx`
5. `/imports/BlogWhiteBgSlidesUp-792-564.tsx`
6. `/imports/BlogWhiteBgSlidesUp-793-64.tsx`
7. `/imports/BlogWhiteBgSlidesUp.tsx`
8. `/imports/Ellipse22.tsx`
9. `/imports/Frame1000003013.tsx`
10. `/imports/Frame1000003036.tsx`
11. `/imports/Process1stStep-737-1249.tsx`
12. `/imports/Process1stStep-737-1383.tsx`
13. `/imports/Process1stStepIcon-737-1099.tsx`
14. `/imports/Process2ndStep-752-1518.tsx`
15. `/imports/Process3rdStep-734-494.tsx`
16. `/imports/Process3rdStep-752-1674.tsx`

---

## Unused UI Components (components/ui/*.tsx)

**All components in the `/components/ui/` folder are unused.** These are shadcn/ui components that were likely scaffolded but never implemented:

1. `/components/ui/accordion.tsx` - **WAIT!** This might be used in Team component
2. `/components/ui/alert-dialog.tsx`
3. `/components/ui/alert.tsx`
4. `/components/ui/aspect-ratio.tsx`
5. `/components/ui/avatar.tsx`
6. `/components/ui/badge.tsx`
7. `/components/ui/breadcrumb.tsx`
8. `/components/ui/button.tsx`
9. `/components/ui/calendar.tsx`
10. `/components/ui/card.tsx`
11. `/components/ui/carousel.tsx`
12. `/components/ui/chart.tsx`
13. `/components/ui/checkbox.tsx`
14. `/components/ui/collapsible.tsx`
15. `/components/ui/command.tsx`
16. `/components/ui/context-menu.tsx`
17. `/components/ui/dialog.tsx`
18. `/components/ui/drawer.tsx`
19. `/components/ui/dropdown-menu.tsx`
20. `/components/ui/form.tsx`
21. `/components/ui/hover-card.tsx`
22. `/components/ui/input-otp.tsx`
23. `/components/ui/input.tsx`
24. `/components/ui/label.tsx`
25. `/components/ui/menubar.tsx`
26. `/components/ui/navigation-menu.tsx`
27. `/components/ui/pagination.tsx`
28. `/components/ui/popover.tsx`
29. `/components/ui/progress.tsx`
30. `/components/ui/radio-group.tsx`
31. `/components/ui/resizable.tsx`
32. `/components/ui/scroll-area.tsx`
33. `/components/ui/select.tsx`
34. `/components/ui/separator.tsx`
35. `/components/ui/sheet.tsx`
36. `/components/ui/sidebar.tsx`
37. `/components/ui/skeleton.tsx`
38. `/components/ui/slider.tsx`
39. `/components/ui/sonner.tsx`
40. `/components/ui/switch.tsx`
41. `/components/ui/table.tsx`
42. `/components/ui/tabs.tsx`
43. `/components/ui/textarea.tsx`
44. `/components/ui/toggle-group.tsx`
45. `/components/ui/toggle.tsx`
46. `/components/ui/tooltip.tsx`
47. `/components/ui/use-mobile.ts`
48. `/components/ui/utils.ts`

**Note**: Before deleting, verify that accordion.tsx is not used in the Team component for the team member accordions.

---

## Unused Main Components

1. `/components/HeroMobile.tsx` - This component exists but is never imported or used. The mobile hero functionality is handled by `HeroScrollSectionMobile.tsx` instead.

---

## Used Files (DO NOT DELETE)

For reference, here are the files that ARE in use:

### Used SVG Files
- svg-075cmii2x1.ts (MobileMenu)
- svg-0h8xki9d41.ts (AboutUsNavigation)
- svg-1tzim1euwq.ts (AboutUsNavigation, Navigation)
- svg-4nnubvddnl.ts (AboutUsMobile)
- svg-62agla70ld.ts (Splash)
- svg-a12xqqb4fo.ts (HeroScrollSection)
- svg-avyll6yivq.ts (Reviews)
- svg-bolpleu54r.ts (CustomCursor)
- svg-euomkbalfx.ts (ProcessMobile)
- svg-hkse6zvihd.ts (MobileNavigation, MobileNavigationLight)
- svg-i4lcoo4sqc.ts (AboutUs)
- svg-i9v3tx5fim.ts (Blogs)
- svg-iqnu45ed6g.ts (CustomCursor)
- svg-jnardqphfi.ts (SplashMobile)
- svg-k4gl8dsfxl.ts (CustomCursor)
- svg-l10gl4rbi7.ts (Blogs)
- svg-n75w9nmva4.ts (Team)
- svg-nqtx3ye8rh.ts (ProcessMobile)
- svg-ocjo2bj55r.ts (CustomCursor)
- svg-oksog5kqro.ts (HeroScrollSection)
- svg-qvylmze8pl.ts (AboutUsNavigation)
- svg-r0vybjpidk.ts (ProcessMobile)
- svg-tqff6mendf.ts (AboutUsNavigation)
- svg-trmtdcmgb9.ts (MobileNavigation, MobileNavigationLight)
- svg-tsrio0k8sm.ts (BlogsMobile)
- svg-u4aqnlggjb.ts (HeroScrollSectionMobile)
- svg-vfi0emqqhx.ts (SplashMobile)
- svg-w3sqzfwyzd.ts (SplashMobile)
- svg-whbrdv87q5.ts (AboutUsNavigation)
- svg-whtgxs3zhn.ts (AboutUsNavigation)
- svg-wkqtg88nrk.ts (CustomCursor)
- svg-xkm9sv2hyu.ts (HeroMobile)
- svg-ypzv7eolo3.ts (HeroMobile, HeroScrollSectionMobile)
- svg-z5mgt22h4a.ts (AboutUs)
- svg-zhcojralya.ts (Services)

### Used TSX Components (imports)
- AboutUsScrollEffect.tsx (HeroScrollSection)
- Frame1000002973-804-8.tsx (BlogsMobile)
- Frame1000002973.tsx (Blogs)
- Frame1000002974-804-16.tsx (BlogsMobile)
- Frame1000002974.tsx (Blogs)
- Frame1000002994.tsx (Splash)
- Main100000014621826160272210780000006234564362710872498.tsx (SplashMobile)
- Process1stStep.tsx (Process)
- Process1stStepIcon.tsx (Process)
- Process2ndStep.tsx (Process)
- Process3rdStep.tsx (Process)
- Rectangle14188.tsx (Splash)
- Rectangle14189.tsx (Splash)
- UsersThree-623-37.tsx (AboutUsNavigation)
- UsersThree.tsx (AboutUsNavigation)

### Used Main Components
- AboutUs.tsx
- AboutUsMobile.tsx
- AboutUsNavigation.tsx
- AnimatedDoubtButton.tsx (used in Services)
- Blogs.tsx
- BlogsMobile.tsx
- CustomCursor.tsx
- DownArrowButton.tsx (used in HeroScrollSection and Reviews)
- HeroScrollSection.tsx
- HeroScrollSectionMobile.tsx
- MobileMenu.tsx
- MobileNavigation.tsx
- MobileNavigationLight.tsx
- MobileUpArrow.tsx
- Navigation.tsx
- Process.tsx
- ProcessMobile.tsx
- Reviews.tsx
- Services.tsx (used in AboutUs)
- ServicesMobile.tsx
- Splash.tsx
- SplashMobile.tsx
- Team.tsx
- TeamMobile.tsx
- UpArrowButton.tsx

---

## Recommendation

You can safely delete all the unused files listed above to clean up the project. This will:
- Reduce bundle size
- Improve build times
- Make the codebase easier to maintain
- Remove clutter from the project

**Before deletion**, it's recommended to:
1. Check if `accordion.tsx` is used in Team/TeamMobile components
2. Commit your current code to version control
3. Test the application after deletion to ensure nothing breaks
