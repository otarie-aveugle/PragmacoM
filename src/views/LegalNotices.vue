<script>
export default {
  name: 'LegalNotices',
}
</script>

<template>
  <section class="p-8 text-gray-800 min-h-screen flex items-center justify-center">
    <div id="legal-notices" class="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h1 class="text-4xl font-bold mb-6 text-primary">Mentions Légales</h1>

      <!-- Informations légales de la société -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-3">
          Informations légales de la société
        </h2>
        <p class="mb-2">
          <span class="font-semibold">Dénomination sociale :</span> [Nom de
          l'entreprise]
        </p>
        <p class="mb-2">
          <span class="font-semibold">Forme juridique :</span> [Forme juridique
          de l'entreprise, ex: SAS, SARL]
        </p>
        <p class="mb-2">
          <span class="font-semibold">Montant du capital social :</span>
          [Capital social en euros]
        </p>
      </div>

      <!-- Adresse et Contact -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-3">Coordonnées</h2>
        <p class="mb-2">
          <span class="font-semibold">Adresse du siège social :</span> [Adresse
          complète de l'entreprise]
        </p>
        <p class="mb-2">
          <span class="font-semibold">Adresse de contact :</span> [Adresse
          e-mail] ou <span class="font-semibold">Téléphone :</span> [Numéro de
          téléphone]
        </p>
      </div>

      <!-- Propriété intellectuelle -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-3">Propriété Intellectuelle</h2>
        <p class="mb-2">
          Ce site utilise des images, illustrations, et photographies protégées
          par des droits d'auteur. Les images et autres contenus visuels sont la
          propriété de leurs auteurs respectifs ou utilisés sous licence. Toute
          reproduction, copie ou usage est strictement interdit sans
          autorisation préalable.
        </p>
        <p class="mb-2">
          Les textes utilisés sur ce site sont, sauf mention contraire, la
          propriété de [Nom de l'entreprise]. Tout autre texte doit être
          accompagné d'une source ou d'une autorisation de l'auteur original.
        </p>
      </div>

      <!-- Informations sur l'hébergeur -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-3">Hébergement du site</h2>
        <p class="mb-2">
          <span class="font-semibold">Nom de l’hébergeur :</span> [Nom de
          l'hébergeur]
        </p>
        <p class="mb-2">
          <span class="font-semibold">Raison sociale :</span> [Raison sociale de
          l'hébergeur]
        </p>
        <p class="mb-2">
          <span class="font-semibold">Adresse :</span> [Adresse complète de
          l'hébergeur]
        </p>
        <p class="mb-2">
          <span class="font-semibold">Numéro de téléphone :</span> [Numéro de
          téléphone de l'hébergeur]
        </p>
      </div>

      <!-- Informations commerciales -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-3">Informations commerciales</h2>
        <p class="mb-2">
          <span class="font-semibold"
            >Numéro d'inscription au registre du commerce et des sociétés (RCS)
            :</span
          >
          [Numéro RCS]
        </p>
        <p class="mb-2">
          <span class="font-semibold"
            >Numéro d'inscription au registre national unique des entreprises
            (RNE) :</span
          >
          [Numéro RNE]
        </p>
        <p class="mb-2">
          <span class="font-semibold">Numéro de TVA intracommunautaire :</span>
          [Numéro de TVA, le cas échéant]
        </p>
      </div>
    </div>
  </section>
</template>

<style></style>
